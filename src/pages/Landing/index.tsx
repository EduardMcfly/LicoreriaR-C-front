import React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  fade,
  emphasize,
  Typography,
  lighten,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RoomIcon from '@material-ui/icons/Room';

import texture from 'assets/texture.png';
import background from 'assets/background.png';
import { AppName } from 'constantsApp';
import { Header, Footer } from 'components/Layout';
import FormProduct from 'components/Product/form';
import { useIsAdmin } from 'contexts';

import Banners from './Banners';
import MoreInformation from './MoreInformation';

const useStyles = makeStyles((theme) => {
  const timeTransition = '1s';
  const { contrastText } = theme.palette.primary;
  return {
    summary: {
      height: theme.spacing(50),
      overflow: 'hidden',
      position: 'relative',
      transition: `color ${timeTransition} ease`,
      color: lighten(contrastText, 0.6),
      '&:hover': {
        color: emphasize(emphasize(contrastText, 1), 1),
        '& $overlay': {
          background: fade(theme.palette.primary.main, 0.7),
        },
        '& $text': {
          background: fade(emphasize(contrastText, 0.8), 0.4),
          padding: theme.spacing(8, 0),
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
        fade(theme.palette.background.paper, 0.6),
        0.8,
      ),
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    text: { transition: `all ${timeTransition} ease` },
    location: {},
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
  const isAdmin = useIsAdmin();
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
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              className={classes.text}
            >
              Bienvenido a {AppName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} sm="auto">
                <Grid container justify="center" alignItems="center">
                  <RoomIcon />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm="auto"
                className={classes.location}
              >
                <Typography variant="h6" align="center" noWrap>
                  Simijaca - Cundinamarca
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        justify="center"
        className={classes.summaryButton}
      >
        <MoreInformation />
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
      <Footer />
      <FormProduct
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
