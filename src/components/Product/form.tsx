import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonGroup, Grid, makeStyles } from '@material-ui/core';

import {
  Scalars,
  Maybe,
  useCreateProduct,
  useEditProduct,
  ProductEditInput,
} from 'graphqlAPI';
import NumberFormatCustom from '../NumberFormatCustom';
import { DialogContentLoading } from '../Dialog/DialogContentLoading';

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
  category: Scalars['ID'];
  price: number | '';
  amount: number | '';
  image?: File;
  imageUrl?: string;
}

type PartialAndNull<T> = {
  [P in keyof T]?: T[P] | null;
};

interface Base {
  open: boolean;
  onClose?: () => void;
  values?: PartialAndNull<Fields>;
}

interface EditProductProps extends Base {
  mode?: 'edit';
  id: Scalars['ID'];
}

interface CreateProductProps extends Base {
  mode?: 'create';
}

enum FieldImage {
  image,
  imageUrl,
}

const defaultValues: Fields = {
  name: '',
  description: '',
  category: '',
  price: '',
  amount: '',
  imageUrl: '',
};

export const FormProduct = (
  props: EditProductProps | CreateProductProps,
) => {
  const { open, onClose, values: valuesBase } = props;
  const classes = useStyles();
  const [createProduct, createProductResult] = useCreateProduct();
  const [editProduct, editProductResult] = useEditProduct();
  const [values, setValues] = React.useState<Fields>(() => {
    const newValues: Partial<Fields> = {};
    for (const key in valuesBase)
      if (valuesBase.hasOwnProperty(key)) {
        const a = key as keyof Fields;
        const value = valuesBase[a];
        if (value) newValues[a] = value as any;
      }
    return {
      ...defaultValues,
      ...newValues,
    };
  });

  const loading =
    createProductResult.loading || editProductResult.loading;
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
          {props.mode === 'create'
            ? 'Nuevo producto'
            : 'Editar producto'}
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
            <Grid item xs="auto">
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
            <Grid item xs={12}>
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
              if (props.mode === 'create') {
                if (!(price && name && amount)) return;
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
                setValues(defaultValues);
              } else if (props.mode === 'edit') {
                const { id } = props;
                let editVariables: ProductEditInput | undefined;
                const setVariables = (
                  values: Partial<ProductEditInput>,
                ) => {
                  editVariables = {
                    ...editVariables,
                    ...values,
                  };
                };
                if (name) setVariables({ name });
                if (description) setVariables({ description });
                if (price) setVariables({ price });
                if (amount) setVariables({ amount });
                if (image) setVariables({ image });
                if (imageUrl) setVariables({ imageUrl });
                if (editVariables) {
                  await editProduct({
                    variables: { id, product: editVariables },
                  });
                  onClose && onClose();
                  setValues(defaultValues);
                }
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
export default FormProduct;
