import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

import { useCreateProduct } from 'graphqlAPI';
import NumberFormatCustom from 'components/NumberFormatCustom';

interface AddProductProps {
  open: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles((theme) => {
  return {
    file: { marginTop: theme.spacing(1) },
  };
});

interface Fields {
  name: string;
  description: string;
  price: number | '';
  quantity: number | '';
  image?: File;
}

export const AddProduct = ({ open, onClose }: AddProductProps) => {
  const classes = useStyles();
  const [createProduct] = useCreateProduct();
  const [values, setValues] = React.useState<Fields>({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const setField = (name: keyof Fields, value: any) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Nuevo producto
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={({ target: { value } }) => {
              setField('name', value);
            }}
            margin="dense"
            type="text"
            autoFocus
            fullWidth
          />
          <TextField
            label="Descripción"
            name="description"
            value={values.description}
            onChange={({ target: { value } }) => {
              setField('description', value);
            }}
            margin="dense"
            type="text"
            fullWidth
          />
          <TextField
            label="Precio"
            name="price"
            value={values.price}
            onChange={({ target: { value } }) => {
              setField('price', value);
            }}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            fullWidth
          />
          <TextField
            label="Cantidad"
            name="quantity"
            value={values.quantity}
            onChange={({ target: { value } }) => {
              setField('quantity', value);
            }}
            margin="dense"
            type="number"
            fullWidth
          />
          <Button
            className={classes.file}
            variant="contained"
            component="label"
            fullWidth
          >
            Subir imagen
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={({ target: { files } }) => {
                setField('image', files?.item(0) || undefined);
              }}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              const { name, description, price } = values;
              if (price && name && description) {
                createProduct({
                  variables: {
                    product: { name, description, price },
                  },
                });
              }
            }}
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddProduct;
