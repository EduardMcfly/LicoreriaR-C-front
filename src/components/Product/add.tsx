import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonGroup, Grid, makeStyles } from '@material-ui/core';

import { useCreateProduct } from 'graphqlAPI';
import NumberFormatCustom from '../NumberFormatCustom';
import { DialogContentLoading } from '../Dialog/DialogContentLoading';

interface AddProductProps {
  open: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles((theme) => ({
  fileRoot: { marginTop: theme.spacing(1) },
  file: { marginTop: theme.spacing(2) },
  loadingRoot: {
    position: 'relative',
  },
}));

interface Fields {
  name: string;
  description: string;
  price: number | '';
  amount: number | '';
  image?: File;
  imageUrl?: string;
}

enum FieldImage {
  image,
  imageUrl,
}

export const AddProduct = ({ open, onClose }: AddProductProps) => {
  const classes = useStyles();
  const [createProduct, { loading }] = useCreateProduct();
  const [values, setValues] = React.useState<Fields>({
    name: '',
    description: '',
    price: '',
    amount: '',
    imageUrl: '',
  });

  const [fieldImage, setFieldImage] = React.useState<FieldImage>(
    FieldImage.image,
  );

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
        <DialogContent className={classes.loadingRoot}>
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
              setField('price', +value);
            }}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            fullWidth
          />
          <TextField
            label="Cantidad"
            name="amount"
            value={values.amount}
            onChange={({ target: { value } }) => {
              setField('amount', +value);
            }}
            margin="dense"
            type="number"
            fullWidth
          />
          <Grid
            container
            justify="center"
            className={classes.fileRoot}
          >
            <Grid xs="auto">
              <ButtonGroup
                disableElevation
                variant="text"
                color="primary"
              >
                <Button
                  onClick={() => setFieldImage(FieldImage.imageUrl)}
                >
                  Image URL
                </Button>
                <Button
                  onClick={() => setFieldImage(FieldImage.image)}
                >
                  Image
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid xs={12}>
              {fieldImage === FieldImage.imageUrl && (
                <TextField
                  label="Enlace de la imagen"
                  name="imageUrl"
                  value={values.imageUrl}
                  onChange={({ target: { value } }) => {
                    setField('imageUrl', value);
                  }}
                  margin="dense"
                  type="text"
                  fullWidth
                />
              )}
              {fieldImage === FieldImage.image && (
                <Button
                  variant="contained"
                  component="label"
                  color="secondary"
                  fullWidth
                  className={classes.file}
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
              )}
            </Grid>
          </Grid>
          {loading && (
            <DialogContentLoading size={60} color="secondary" />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button
            disabled={loading}
            onClick={async () => {
              const {
                name,
                description,
                price,
                amount,
                image,
                imageUrl,
              } = values;
              if (price && name && amount) {
                await createProduct({
                  variables: {
                    product: {
                      name,
                      description,
                      price,
                      amount,
                      image,
                      imageUrl,
                    },
                  },
                });
                onClose && onClose();
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
