import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { AppName } from 'constantsApp';
import { appBarSpacer } from '../../ThemeContext/styles';
import { Items } from './Items';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: appBarSpacer(theme, true),
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar variant="regular">
          <Typography variant="h5">{AppName}</Typography>
          <Items />
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
    </>
  );
};
