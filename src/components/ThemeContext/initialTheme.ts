import green from '@material-ui/core/colors/green';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteType } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const initialTheme: (
  paletteType: PaletteType,
) => ThemeOptions = (paletteType) => {
  const primary = paletteType === 'light' ? grey[800] : grey[900];
  const secondary =
    paletteType === 'light' ? darken(green[600], 0) : green[600];
  return {
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        default: paletteType === 'light' ? grey[100] : grey[800],
        paper: paletteType === 'light' ? '#fff' : grey[900],
      },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
    },
    props: {
      MuiButton: {
        variant: 'contained',
      },
    },
    overrides: {
      MuiButton: {
        contained: {
          borderRadius: 15,
          border: 0,
        },
      },
    },
  };
};
