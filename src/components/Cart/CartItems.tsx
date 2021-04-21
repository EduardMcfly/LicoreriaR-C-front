import {
  makeStyles,
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { createAPIImageRoute } from 'constantsApp';
import { useShop } from 'contexts/Shop';
import { Product } from 'graphqlAPI';

import { Amount } from '../Fields/Amount';

const useStyles = makeStyles((theme) => ({
  large: {
    margin: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  gridRoot: { position: 'relative' },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

interface CartItemsProps {
  products?: Product[];
  loading: boolean;
}

export const CartItems = ({ products, loading }: CartItemsProps) => {
  const classes = useStyles();
  const shop = useShop();
  return (
    <Grid
      container
      style={{ padding: '10px' }}
      spacing={4}
      justify="center"
    >
      {loading && (
        <Grid item xs={12}>
          <Grid container justify="center">
            <CircularProgress size={60} />
          </Grid>
        </Grid>
      )}
      {shop.products.map(({ id, amount }) => {
        const product = products?.find((a) => a.id === id);
        if (!product) return null;

        const getMax = () => {
          const max = product?.amount || 99;
          return max;
        };

        return (
          <Grid item xs={12} md={6} lg={4}>
            <Grid
              container
              alignItems="center"
              className={classes.gridRoot}
            >
              <Grid item xs sm={8}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.large}
                      alt={product.name}
                      src={
                        (product.image &&
                          createAPIImageRoute(product.image, {
                            width: 300,
                          })) ||
                        undefined
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    primaryTypographyProps={{
                      variant: 'h6',
                      noWrap: true,
                    }}
                  />
                </ListItem>
              </Grid>
              <Grid item sm={4}>
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
              <IconButton
                className={classes.delete}
                color="primary"
                aria-label="Remove"
                onClick={() => {
                  shop.removeProduct(product.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
