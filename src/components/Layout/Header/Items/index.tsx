import React from 'react';
import { makeStyles, Badge, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useShop } from '../../../../contexts/Shop/index';

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
  const { products } = useShop();
  return (
    <div className={classes.root}>
      <IconButton>
        <Badge
          badgeContent={products.length}
          className={classes.icon}
          color="secondary"
          aria-label="cart"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );
};
