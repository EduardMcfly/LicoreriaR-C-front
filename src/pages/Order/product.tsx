import { Grid } from '@material-ui/core';

import { ProductOrder } from 'graphqlAPI';
import { CartItem } from 'components/Cart/steps/Products/CartItem';

interface ProductProps {
  product: ProductOrder;
}

export const Product = ({ product }: ProductProps) => {
  const { id: idProduct, amount, image, name, unitPrice } = product;
  return (
    <Grid item xs={12}>
      <CartItem
        {...{
          id: idProduct,
          edit: false,
          cartProduct: {
            id: idProduct,
            product: {
              image,
              name,
              price: unitPrice,
            },
            amount: amount,
          },
        }}
      />
    </Grid>
  );
};
