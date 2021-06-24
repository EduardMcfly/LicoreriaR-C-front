import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Avatar,
  AppBarProps,
  ToolbarProps,
} from '@material-ui/core';

import { AppName, PathRoutes } from 'constantsApp';
import logo from 'assets/logo.png';
import { appBarSpacer } from '../../ThemeContext/styles';
import { Items } from './Items';
import { ToolbarLinkRef } from './ToolbarLinkRef';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: appBarSpacer(theme, true),
  icon: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  toolbarRoot: {
    position: 'relative',
    margin: theme.spacing(0, 2),
  },
  toolbarItem: {
    marginLeft: 'auto',
    width: theme.spacing(12),
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
        <div className={classes.toolbarRoot}>
          <Toolbar
            variant="regular"
            component={ToolbarLinkRef}
            to={PathRoutes.LANDING}
            disableGutters
            {...toolbarProps}
          >
            <Avatar src={logo} className={classes.icon} />
            <Typography variant="h5" noWrap>
              {AppName}
            </Typography>
            <div className={classes.toolbarItem} />
          </Toolbar>
          {items && <Items />}
        </div>
      </AppBar>
      <div className={classes.appBarSpacer} />
    </>
  );
};
