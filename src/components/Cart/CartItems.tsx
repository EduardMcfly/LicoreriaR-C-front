import { Grid, CircularProgress, Divider } from '@material-ui/core';

import { useShop } from 'contexts/Shop';
import { Product } from 'graphqlAPI';

import { CartItem } from './CartItem';

interface CartItemsProps {
  products?: Product[];
  loading: boolean;
}

export const CartItems = ({ products, loading }: CartItemsProps) => {
  const shop = useShop();
  return (
    <Grid container justify="center">
      {loading && (
        <Grid item xs={12}>
          <Grid container justify="center">
            <CircularProgress size={60} />
          </Grid>
        </Grid>
      )}
      {shop.products.map((product, i) => (
        <Grid item xs={12}>
          <CartItem
            key={product.id}
            {...{
              product: products?.find((a) => a.id === product.id),
              amount: product.amount,
            }}
          />
          {!!(shop.products.length - (i + 1)) && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};
