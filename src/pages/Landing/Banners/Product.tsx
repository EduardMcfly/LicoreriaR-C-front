import React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  emphasize,
  fade,
} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Edit from '@material-ui/icons/Edit';
import currencyFormatter from 'currency-formatter';

import { createAPIImageRoute } from 'constantsApp';
import { Product as ProductBase } from 'graphqlAPI';
import beer from 'assets/beer.png';
import AddCart from './AddCart';
import FormProduct from 'components/Product/form';
import { useIsAdmin } from '../../../contexts/Session/utils';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => {
  const { contrastText } = theme.palette.primary;
  return createStyles({
    gridListTile: {
      textAlign: 'center',
      height: 250,
      width: '100%',
      position: 'relative',
      '&:hover': {
        '& $gridListTileBar': {
          height: 120,
          overflow: 'hidden',
        },
      },
    },
    gridImg: {
      objectFit: 'contain',
      padding: theme.spacing(2),
      height: '100%',
    },
    gridListTileTile: {
      display: 'flex',
    },
    gridListTileBar: {
      background: fade(
        emphasize(theme.palette.background.paper, 1),
        0.7,
      ),
      height: 110,
      transition: `height 0.5s ease`,
      borderRadius: theme.spacing(4, 4, 0, 0),
      alignItems: 'start',
    },
    gridListTileBarTitle: {
      marginTop: theme.spacing(1),
    },
    titleWrap: {
      color: contrastText,
    },
    actions: {
      position: 'absolute',
      right: 0,
    },
  });
});

interface ProductProps {
  product: ProductBase;
}

export const Product = ({ product }: ProductProps) => {
  const classes = useStyles();
  const isAdmin = useIsAdmin();
  const [open, setOpen] = React.useState(false);

  const { id, name, description, categoryId, price, image, amount } =
    product;
  return (
    <Grid item key={product.id} xs={12} sm={6} lg={4}>
      <div className={classes.gridListTile}>
        {isAdmin && (
          <div className={classes.actions}>
            <Button
              color="primary"
              startIcon={<Edit />}
              onClick={() => {
                setOpen(true);
              }}
            >
              Editar
            </Button>
          </div>
        )}
        <img
          src={(image && createAPIImageRoute(image)) || beer}
          alt={name}
          className={classes.gridImg}
        />
        <GridListTileBar
          title={name}
          className={classes.gridListTileBar}
          subtitle={
            <>
              <Typography>
                {currencyFormatter.format(price, {
                  code: 'COP',
                  precision: 0,
                })}
              </Typography>
              <AddCart {...{ product }} />
            </>
          }
          classes={{
            titleWrap: classes.titleWrap,
            title: classes.gridListTileBarTitle,
          }}
        />
      </div>
      <FormProduct
        open={open}
        id={id}
        mode="edit"
        values={{
          name,
          description,
          price,
          category: categoryId,
          amount,
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Grid>
  );
};

export default Product;
