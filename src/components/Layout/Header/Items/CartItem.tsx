import React from 'react';
import {
  Badge,
  emphasize,
  fade,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useShop } from '../../../../contexts/Shop';
import CartDialog from '../../../Cart';

interface CartItemProps {
  className?: string;
}
const useStyles = makeStyles((theme) => ({
  background: {
    position: 'fixed',
    inset: 0,
    background: fade(
      emphasize(theme.palette.background.default, 0.8),
      0.9,
    ),
    zIndex: 10,
  },
  circle: {
    position: 'absolute',
    inset: '0px',
    background: fade(theme.palette.background.default, 0.5),
    borderRadius: '50%',
    transform: 'scale(11.5)',
    animation: '$circular-pulse 2s ease-in-out infinite',
  },
  '@keyframes circular-pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(11.5)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

function usePrevious<V extends any>(value: V) {
  const ref = React.useRef<V>(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const CartItem = (props?: CartItemProps) => {
  const classes = useStyles();
  const { className } = { ...props };
  const { products } = useShop();
  const [open, setOpen] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);
  const prevLength = usePrevious(products.length);
  const length = products.length;

  React.useEffect(() => {
    if (!open && prevLength !== length && length === 1) {
      setAnimation(true);
    }
  }, [open, length, prevLength]);
  return (
    <>
      {!open && animation && <div className={classes.background} />}
      <IconButton
        onClick={() => {
          setOpen(true);
          setAnimation(false);
        }}
        style={{
          zIndex: 11,
        }}
      >
        {!open && animation && <div className={classes.circle} />}
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
