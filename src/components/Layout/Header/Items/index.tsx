import React from 'react';
import { makeStyles, Badge, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useShop } from '../../../../contexts/Shop/index';
import CardDialog from '../../../Cart';

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
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <IconButton onClick={() => setOpen(true)}>
        <Badge
          badgeContent={products.length}
          className={classes.icon}
          color="secondary"
          aria-label="cart"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <CardDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
