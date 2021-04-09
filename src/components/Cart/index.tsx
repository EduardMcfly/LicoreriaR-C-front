import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useShop } from 'contexts/Shop';
import { useProducts } from 'graphqlAPI';

import { Amount } from '../Fields/Amount';

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
  large: {
    margin: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
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
  const { products, changeAmount } = useShop();
  const { data } = useProducts();

  const handleClose = () => {
    onClose();
  };

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
      <DialogTitle id="responsive-dialog-title">
        Carrito de compras
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {(!products.length && (
            <div className={classes.cartEmpty}>
              <Typography align="center" variant="h4">
                Tu carrito esta vacío. ¿No sabes qué comprar?
              </Typography>
              <Typography align="center" variant="h6">
                ¡Miles de productos te esperan!
              </Typography>
            </div>
          )) || (
            <Grid
              container
              style={{ padding: '10px' }}
              spacing={4}
              justify="center"
            >
              <Grid item xs={12}>
                Tienes {products.length}
                {` producto${(products.length === 1 && '') || 's'}`}
              </Grid>
              {products.map(({ id, amount }) => {
                const product = data?.products.find(
                  (a) => a.id === id,
                );

                const getMax = () => {
                  const max = product?.max || 99;
                  return max;
                };
                return (
                  product && (
                    <Grid item xs={12} md={6} lg={4}>
                      <Grid container alignItems="center">
                        <Grid item xs sm={8}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar
                                className={classes.large}
                                alt={product.name}
                                src={
                                  product.image ||
                                  'https://previews.123rf.com/images/jemastock/jemastock1802/jemastock180207893/96046578-botella-de-licor-con-dise%C3%B1o-de-etiqueta-de-icono-de-ilustraci%C3%B3n-vectorial-blanco-y-negro-de-la-l%C3%ADnea.jpg'
                                }
                              />
                            </ListItemAvatar>
                            <ListItemText primary={product.name} />
                          </ListItem>
                        </Grid>
                        <Grid item sm={4}>
                          <Amount
                            handleChange={(newAmount) => {
                              const max = getMax();
                              console.log(max);

                              changeAmount({
                                id,
                                amount:
                                  newAmount > max ? max : newAmount,
                              });
                            }}
                            value={amount}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                );
              })}
            </Grid>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Comprar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
