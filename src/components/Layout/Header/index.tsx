import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Avatar,
  AppBarProps,
  ToolbarProps,
} from '@material-ui/core';

import { AppName } from 'constantsApp';
import logo from 'assets/logo.png';
import { appBarSpacer } from '../../ThemeContext/styles';
import { Items } from './Items';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: appBarSpacer(theme, true),
  icon: {
    margin: theme.spacing(0, 2, 0, 0),
  },
}));

interface HeaderProps {
  items?: boolean;
  appBarProps?: AppBarProps;
  toolbarProps?: ToolbarProps;
}

export const Header = (props?: HeaderProps) => {
  const classes = useStyles();
  const { items = true, appBarProps, toolbarProps } = { ...props };
  return (
    <>
      <AppBar {...appBarProps}>
        <Toolbar variant="regular" {...toolbarProps}>
          <Avatar src={logo} className={classes.icon} />
          <Typography variant="h5">{AppName}</Typography>
          {items && <Items />}
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
    </>
  );
};
