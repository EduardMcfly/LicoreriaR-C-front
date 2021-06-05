import {
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core';

import { createAPIImageRoute } from 'constantsApp';
import { useShop, CartProduct } from 'contexts/Shop';
import { Product } from 'graphqlAPI';

import { Amount } from '../Fields/Amount';
import { AvatarProduct } from '../Product';
import { Prices } from '../Prices';

const useStyles = makeStyles((theme) => ({
  large: {
    margin: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  fullWidth: { width: '100%' },
  gridRoot: { position: 'relative' },
}));

interface CartItemProps {
  id: Product['id'];
  cartProduct?: CartProduct;
}

export const CartItem = ({
  id,
  cartProduct,
}: CartItemProps): JSX.Element | null => {
  const classes = useStyles();
  const shop = useShop();
  if (!cartProduct) return null;
  const {
    amount,
    product: { image, name, price },
  } = cartProduct;
  const getMax = () => {
    const max = cartProduct?.product.amount || 99;
    return max;
  };

  return (
    <Grid container alignItems="center" className={classes.gridRoot}>
      <Grid item xs={12} md={5}>
        <ListItem>
          <ListItemAvatar>
            <AvatarProduct
              className={classes.large}
              alt={name}
              src={
                (image &&
                  createAPIImageRoute(image, {
                    width: 300,
                  })) ||
                undefined
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            primaryTypographyProps={{
              variant: 'h6',
              noWrap: true,
            }}
          />
        </ListItem>
      </Grid>
      <Grid item xs={12} md={2}>
        <Amount
          handleChange={(newAmount) => {
            const max = getMax();
            shop.changeAmount({
              id,
              amount: newAmount > max ? max : newAmount,
            });
          }}
          value={amount}
        />
      </Grid>
      <Prices price={price} amount={amount} xs={6} md={2} />
      <Grid item xs={12} md={1}>
        <Grid container justify="center" alignItems="center">
          <IconButton
            color="primary"
            aria-label="Remove"
            onClick={() => {
              shop.removeProduct(id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
