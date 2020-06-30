import { Theme } from '@material-ui/core/styles/createMuiTheme';
import grey from '@material-ui/core/colors/grey';
import { CSSProperties } from '@material-ui/styles/withStyles/withStyles';

export const drawerWidth = 240;

export const appBarShift = (theme: Theme): CSSProperties => ({
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export const appBarSpacer = (
  theme: Theme,
  dense?: boolean,
): CSSProperties => ({
  minHeight: !dense
    ? theme.mixins.toolbar.minHeight
    : theme.spacing(6),
});

export const header = (theme: Theme): CSSProperties => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

export const toolbar = (theme: Theme): CSSProperties => ({
  borderColor: grey[50],
  boxShadow: theme.shadows[0],
  paddingRight: theme.spacing(1),
});
