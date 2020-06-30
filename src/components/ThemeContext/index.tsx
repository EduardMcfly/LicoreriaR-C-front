import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import merge from 'lodash/merge';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { initialTheme } from './initialTheme';
import {
  reducer,
  Actions,
  themeInitialOptions,
  actionsReducer,
  ActionChange,
} from './actions';

/**
 *
 * @param {ThemeOptions} themeOptions
 * @return {ThemeOptions}
 */
function usingHighDensity(themeOptions: ThemeOptions) {
  return merge(themeOptions, {
    props: {
      MuiButton: {
        size: 'small',
      },
      MuiFilledInput: {
        margin: 'dense',
      },
      MuiFormControl: {
        margin: 'dense',
      },
      MuiFormHelperText: {
        margin: 'dense',
      },
      MuiIconButton: {
        size: 'small',
      },
      MuiInputBase: {
        margin: 'dense',
      },
      MuiInputLabel: {
        margin: 'dense',
      },
      MuiListItem: {
        dense: true,
      },
      MuiOutlinedInput: {
        margin: 'dense',
      },
      MuiFab: {
        size: 'small',
      },
      MuiTable: {
        size: 'small',
      },
      MuiTextField: {
        margin: 'dense',
      },
      MuiToolbar: {
        variant: 'dense',
      },
    },
    overrides: {
      MuiIconButton: {
        sizeSmall: {
          // minimal touch target hit spacing
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
        },
      },
    },
  });
}

function usingIdentity(themeOptions: ThemeOptions) {
  return themeOptions;
}

export const DispatchContext = React.createContext<
  React.Dispatch<
    | actionsReducer
    | {
        type: string;
      }
  >
>((() => {
  throw new Error(
    'Forgot to wrap component in ThemeContext.Provider',
  );
}) as any);

const useEnhancedEffect =
  typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;

export function ThemeProvider(
  props: React.PropsWithChildren<unknown>,
) {
  const { children } = props;

  const [themeOptions, dispatch] = React.useReducer(
    reducer,
    themeInitialOptions,
  );

  const prefersDarkMode = useMediaQuery(
    '@media (prefers-color-scheme: dark)',
  );
  const preferredType = prefersDarkMode ? 'dark' : 'light';
  const {
    dense,
    direction,
    paletteColors,
    paletteType = preferredType,
    spacing,
  } = themeOptions;

  // persist paletteType
  React.useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;
  }, [paletteType]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const theme = React.useMemo(() => {
    const themeDecorator = dense ? usingHighDensity : usingIdentity;
    const { palette, ...rest } = initialTheme(paletteType);
    const nextTheme = createMuiTheme(
      themeDecorator({
        palette: {
          ...palette,
          type: paletteType,
          ...paletteColors,
        },
        ...rest,
        direction,
        spacing,
      }),
    );
    return nextTheme;
  }, [dense, direction, paletteColors, paletteType, spacing]);

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if ((process as any).browser) {
      (window as any).theme = theme;
    }
  }, [theme]);

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(
    (options: ActionChange['payload']) =>
      dispatch({ type: Actions.CHANGE, payload: options }),
    [dispatch],
  );
}
