import React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  fade,
  emphasize,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { AppName } from 'constantsApp';
import { Header } from 'components/Layout';
import { useSearch } from 'utils';
import background from 'assets/background.png';
import texture from 'assets/texture.png';
import Banners from './Banners/index';
import AddProduct from '../../components/Product/add';

const useStyles = makeStyles((theme) => {
  const timeTransition = '1s';
  const { contrastText } = theme.palette.primary;
  return {
    summary: {
      height: theme.spacing(50),
      overflow: 'hidden',
      position: 'relative',
      transition: `color ${timeTransition} ease`,
      color: contrastText,
      '&:hover': {
        color: emphasize(emphasize(contrastText, 1), 1),
        '& $overlay': {
          background: fade(contrastText, 0.3),
        },
      },
    },
    summaryText: {
      height: '100%',
    },
    imageRoot: {
      position: 'absolute',
      height: '100%',
      zIndex: -1,
      background: `url(${texture})`,
    },
    image: {
      height: 'auto',
      maxWidth: '100%',
      minHeight: '100%',
      objectFit: 'cover',
      position: 'absolute',
      bottom: '0px',
    },
    overlay: {
      transition: `background ${timeTransition} ease`,
      background: emphasize(
        fade(theme.palette.background.paper, 0.8),
        0.8,
      ),
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    summaryButton: {
      marginTop: theme.spacing(-2),
    },
    banners: {
      padding: theme.spacing(2),
    },
    addProduct: {
      marginBottom: theme.spacing(4),
    },
  };
});

export const Landing = () => {
  const classes = useStyles();
  const { user } = useSearch();
  const isAdmin = user === 'admin';
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Header />
      <div className={classes.summary}>
        <Grid
          className={classes.imageRoot}
          container
          justify="center"
          alignItems="center"
        >
          <img
            src={background}
            className={classes.image}
            alt="background"
          />
          <div className={classes.overlay}></div>
        </Grid>
        <Grid
          className={classes.summaryText}
          container
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="h4" align="center">
              Bienvenido a {AppName}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        justify="center"
        className={classes.summaryButton}
      >
        <Button color="primary" size="small">
          Más información
        </Button>
      </Grid>
      <div className={classes.banners}>
        {isAdmin && (
          <Grid
            container
            justify="flex-end"
            className={classes.addProduct}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Agregar producto
              </Button>
            </Grid>
          </Grid>
        )}
        <Banners />
      </div>
      <AddProduct
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
