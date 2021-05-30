import { Grid, CircularProgress, Divider } from '@material-ui/core';

import { useShop } from 'contexts/Shop';
import { Product } from 'graphqlAPI';

import { CartItem } from './CartItem';

interface CartItemsProps {
  products?: Product[];
  loading: boolean;
}

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const shop = useShop();

  return (
    <>
      {shop.products?.map((product, i) => {
        return (
          <Grid item xs={12} key={product.id}>
            <CartItem
              {...{
                id: product.id,
                product: products?.find((a) => a.id === product.id),
                amount: product.amount,
              }}
            />
            {!!(shop.products.length - (i + 1)) && <Divider />}
          </Grid>
        );
      })}
    </>
  );
};

export const CartItems = ({ products, loading }: CartItemsProps) => {
  return (
    <Grid container justify="center">
      {loading && (
        <Grid item xs={12}>
          <Grid container justify="center">
            <CircularProgress size={60} />
          </Grid>
        </Grid>
      )}
      {products && <Products {...{ products }} />}
    </Grid>
  );
};
