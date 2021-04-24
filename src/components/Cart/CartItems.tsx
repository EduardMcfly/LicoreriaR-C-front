import {
  makeStyles,
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Divider,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import currencyFormatter from 'currency-formatter';

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
  fullWidth: { width: '100%' },
  textCenter: {
    textAlign: 'center',
  },
  gridRoot: { position: 'relative' },
}));

interface CartItemsProps {
  products?: Product[];
  loading: boolean;
}

export const CartItems = ({ products, loading }: CartItemsProps) => {
  const classes = useStyles();
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
      {shop.products.map(({ id, amount }, i) => {
        const product = products?.find((a) => a.id === id);
        if (!product) return null;
        const { price } = product;
        const getMax = () => {
          const max = product?.amount || 99;
          return max;
        };

        return (
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              className={classes.gridRoot}
            >
              <Grid item xs={12} md={5}>
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
              <Grid item xs={6} md={2}>
                <Grid
                  container
                  direction="column"
                  className={classes.textCenter}
                >
                  <Grid item xs>
                    <Typography variant="caption" align="center">
                      Precio unitario:
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <ListItemText
                      primary={currencyFormatter.format(price, {
                        code: 'COP',
                        precision: 0,
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={2}>
                <Grid
                  container
                  direction="column"
                  className={classes.textCenter}
                >
                  <Grid item xs>
                    <Typography variant="caption" align="center">
                      Precio total:
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <ListItemText
                      primary={currencyFormatter.format(
                        price * amount,
                        {
                          code: 'COP',
                          precision: 0,
                        },
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={1}>
                <Grid container justify="center" alignItems="center">
                  <IconButton
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
            </Grid>
            {!!(shop.products.length - (i + 1)) && <Divider />}
          </Grid>
        );
      })}
    </Grid>
  );
};
