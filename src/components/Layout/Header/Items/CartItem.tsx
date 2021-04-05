import React from 'react';
import { Badge, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useShop } from '../../../../contexts/Shop';
import CartDialog from '../../../Cart';

interface CartItemProps {
  className?: string;
}

export const CartItem = (props?: CartItemProps) => {
  const { className } = { ...props };
  const { products } = useShop();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Badge
          badgeContent={products.length}
          className={className}
          color="secondary"
          aria-label="cart"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <CartDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
