import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Grid,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { createAPIImageRoute } from 'constantsApp';
import { Product } from 'graphqlAPI';
import { useShop } from 'contexts/Shop';
import beer from 'assets/beer.png';
import { Amount } from 'components/Fields/Amount';
import { AvatarProduct } from 'components/Product';
import { Prices } from 'components/Prices';

interface AddCartProps {
  product: Product;
}

export default function AddCart({ product: item }: AddCartProps) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(1);
  const { addProduct, products } = useShop();

  const getMax = React.useCallback(() => {
    const itemShop = products.find(({ id }) => item.id === id);
    const max = (item.amount || 99) - (itemShop?.amount || 0);
    return max;
  }, [products, item]);

  React.useEffect(() => {
    const max = getMax();
    if (amount > max) setAmount(max);
  }, [amount, getMax, setAmount]);

  const handleChange = (newValue: string | number) => {
    const max = getMax();
    const value = Number(newValue);
    setAmount(value > max ? max : value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        Comprar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <ListItem>
            <ListItemAvatar>
              <AvatarProduct
                alt={item.name}
                src={
                  (item.image && createAPIImageRoute(item.image)) ||
                  beer
                }
              />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        </DialogTitle>
        <DialogContent>
          <Amount handleChange={handleChange} value={amount} />
          <Grid container>
            <Prices
              {...{ amount, price: item.price }}
              xs={12}
              sm={6}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            endIcon={<AddShoppingCartIcon />}
            onClick={() => {
              if (amount) {
                addProduct({ id: item.id, amount });
                handleClose();
              }
            }}
            color="secondary"
          >
            <Typography noWrap>Agregar al carrito</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
