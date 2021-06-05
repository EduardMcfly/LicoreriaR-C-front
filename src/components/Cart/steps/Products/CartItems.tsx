import { Grid, CircularProgress, Divider } from '@material-ui/core';

import { useShop } from 'contexts/Shop';

import { CartItem } from './CartItem';

interface CartItemsProps {
  loading: boolean;
}

const Products = () => {
  const shop = useShop();
  return (
    <>
      {shop.products?.map((product, i) => (
        <Grid item xs={12} key={product.id}>
          <CartItem
            {...{
              id: product.id,
              cartProduct: product,
            }}
          />
          {!!(shop.products.length - (i + 1)) && <Divider />}
        </Grid>
      ))}
    </>
  );
};

export const CartItems = ({ loading }: CartItemsProps) => {
  return (
    <Grid container justify="center">
      {loading && (
        <Grid item xs={12}>
          <Grid container justify="center">
            <CircularProgress size={60} />
          </Grid>
        </Grid>
      )}
      <Products />
    </Grid>
  );
};
