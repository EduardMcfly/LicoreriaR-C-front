import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { appBarSpacer } from '../../ThemeContext/styles';
import { AppName } from '../../../constants/index';
import { Items } from './Items';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: appBarSpacer(theme),
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h5">{AppName}</Typography>
          <Items />
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
    </>
  );
};
