import React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  fade,
  emphasize,
  Typography,
} from '@material-ui/core';

import { AppName } from 'constantsApp';
import { Header } from 'components/Layout';
import nails from 'assets/nails.webp';

const useStyles = makeStyles((theme) => {
  const timeTransition = '1s';
  return {
    summary: {
      height: theme.spacing(50),
      overflow: 'hidden',
      position: 'relative',
      transition: `color ${timeTransition} ease`,
      color: theme.palette.background.paper,
      '&:hover': {
        color: emphasize(theme.palette.background.paper, 1),
        '& $overlay': {
          background: fade(theme.palette.background.paper, 0.4),
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
    },
    image: {
      height: 'auto',
      minHeight: '100%',
      objectFit: 'cover',
      maxWidth: '100%',
    },
    overlay: {
      transition: `background ${timeTransition} ease`,
      background: emphasize(
        fade(theme.palette.background.paper, 0.4),
        0.8,
      ),
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    summaryButton: {
      marginTop: theme.spacing(-2),
    },
  };
});

export const Landing = () => {
  const classes = useStyles();
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
          <img src={nails} className={classes.image} alt="nails" />
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
    </>
  );
};
