import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { useShop } from 'contexts/Shop';
import { Amount } from 'components/Fields/Amount';
import { Product } from 'graphqlAPI';

interface AddCartProps {
  product: Product;
}

export default function AddCart({ product: item }: AddCartProps) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(0);
  const { addProduct, products } = useShop();

  const getMax = React.useCallback(() => {
    const itemShop = products.find(({ id }) => item.id === id);
    const max = (item.max || 99) - (itemShop?.amount || 0);
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
              <Avatar alt={item.name} src={item.image || ''} />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        </DialogTitle>
        <DialogContent>
          <Amount handleChange={handleChange} value={amount} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
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
