import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, isWidthDown } from '@material-ui/core';
import {
  Breakpoint,
  keys,
  BreakpointValues,
} from '@material-ui/core/styles/createBreakpoints';

export * from './helpers';
export * from './useSearch';
export * from './usePrevious';

export function useWidth() {
  const theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      // eslint-disable-next-line
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export const getGrid = (
  breakpoints?: Partial<BreakpointValues>,
  width?: Breakpoint,
) => {
  // eslint-disable-next-line
  if (!width) width = useWidth();
  if (breakpoints)
    for (const key of [...keys].reverse())
      if (isWidthDown(width, key) && breakpoints[key])
        return breakpoints[key];
  return 1;
};
