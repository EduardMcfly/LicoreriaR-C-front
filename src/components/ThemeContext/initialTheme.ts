import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteType } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const initialTheme: (
  paletteType: PaletteType,
) => ThemeOptions = (paletteType) => {
  const primary = paletteType === 'light' ? pink[400] : pink[600];
  const secondary =
    paletteType === 'light' ? darken(blue.A400, 0.1) : blue[300];
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
      fontFamily:
        '"Quicksand","Roboto", "Helvetica", "Arial", sans-serif',
    },
    props: {
      MuiButton: {
        variant: 'contained',
      },
    },
    overrides: {
      MuiButton: {
        contained: {
          background: `linear-gradient(45deg, ${primary} 30%, ${purple['700']} 80%)`,
          borderRadius: 3,
          border: 0,
          color: 'white',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
  };
};
