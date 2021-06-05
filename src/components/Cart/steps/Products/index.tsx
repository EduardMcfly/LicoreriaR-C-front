import { useShop } from 'contexts';
import {
  Grid,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { CartItems } from './CartItems';

const useStyles = makeStyles((theme) => ({
  cartEmpty: {
    padding: theme.spacing(6),
  },
}));

export const Products = () => {
  const classes = useStyles();
  const { products, loading } = useShop();
  return (
    <>
      {loading && (
        <Grid item xs={12}>
          <Grid container justify="center">
            <CircularProgress size={60} />
          </Grid>
        </Grid>
      )}
      {!products.length && !loading && (
        <div className={classes.cartEmpty}>
          <Typography align="center" variant="h4">
            Tu carrito esta vacío.¿No sabes qué comprar?
          </Typography>
          <Typography align="center" variant="h6">
            ¡Miles de productos te esperan!
          </Typography>
        </div>
      )}
      {!!products.length && <CartItems {...{ loading }} />}
    </>
  );
};
