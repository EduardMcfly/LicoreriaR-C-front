import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Avatar,
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

export const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar variant="regular">
          <Avatar src={logo} className={classes.icon} />
          <Typography variant="h5">{AppName}</Typography>
          <Items />
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
    </>
  );
};
