import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@material-ui/core';

import { useShop } from 'contexts/Shop';
import { Product } from './products';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {},
  }),
);

interface AddCartProps {
  product: Product;
}

export default function AddCart({ product: item }: AddCartProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(0);
  const { addItem, items } = useShop();

  const getMax = React.useCallback(() => {
    const itemShop = items.find(({ id }) => item.id === id);
    const max = item.max - (itemShop?.amount || 0);
    return max;
  }, [items, item]);

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
              <Avatar alt={item.title} src={item.image} />
            </ListItemAvatar>
            <ListItemText primary={item.title} />
          </ListItem>
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="add-cart-dialog-select-label">
              Cantidad
            </InputLabel>
            <Input
              type="number"
              id="my-input"
              aria-describedby="my-helper-text"
              value={amount || ''}
              startAdornment={
                <IconButton
                  color="primary"
                  aria-label="reduce"
                  onClick={() => {
                    handleChange(Math.max(amount - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              }
              endAdornment={
                <IconButton
                  color="primary"
                  aria-label="increase"
                  onClick={() => {
                    handleChange(amount + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              }
              onChange={({ target: { value } }) =>
                handleChange(value)
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (amount) {
                addItem({ id: item.id, amount });
              }
            }}
            color="secondary"
          >
            Agregar al carrito
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
