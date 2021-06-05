import qs from 'querystring';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  makeStyles,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useShop } from 'contexts';

import { CartItems } from './CartItems';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cartEmpty: {
    padding: theme.spacing(6),
  },
}));

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDialog({
  open,
  onClose,
}: CartDialogProps) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { products, loading } = useShop();

  const handleClose = () => {
    onClose();
  };


  const title = 'Carrito de compras';

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="xl"
    >
      {fullScreen && (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.title}>{title}</Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      {!fullScreen && (
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
      )}
      <DialogContent>
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
              Tu carrito esta vacío. ¿No sabes qué comprar?
            </Typography>
            <Typography align="center" variant="h6">
              ¡Miles de productos te esperan!
            </Typography>
          </div>
        )}
        {!!products.length && <CartItems {...{ loading }} />}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cerrar
        </Button>
        <Button
          disabled={!products.length}
          onClick={() => {
            let text = `Hola\n`;
            text += `Estoy interad@ en comprar estos productos:\n`;
            for (const { id, amount } of products) {
              const cartProduct = products.find((x) => x.id === id);
              if (cartProduct) {
                const { product } = cartProduct;
                text += `${product.name}: ${amount}\n`;
              }
            }
            let url = 'https://wa.me/573204283576?';
            url += qs.stringify({ text });
            window.location.href = url;
          }}
          color="primary"
          autoFocus
        >
          Comprar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
