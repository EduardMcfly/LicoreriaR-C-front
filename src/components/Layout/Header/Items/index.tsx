import React from 'react';
import { makeStyles, Badge, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import { CartItem } from './CartItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

export const Items = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CartItem className={classes.icon} />
      <IconButton onClick={() => true}>
        <Badge
          className={classes.icon}
          color="secondary"
          aria-label="cart"
        >
          <PersonIcon />
        </Badge>
      </IconButton>
    </div>
  );
};
