import {
  Theme,
  createStyles,
  makeStyles,
  emphasize,
  fade,
} from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import currencyFormatter from 'currency-formatter';

import { useProducts } from 'graphqlAPI';
import { createAPIImageRoute } from 'constantsApp';
import { getGrid, useWidth } from 'utils';

import AddCart from './AddCart';

const useStyles = makeStyles((theme: Theme) => {
  const { contrastText } = theme.palette.primary;
  return createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    icon: {
      color: contrastText,
    },
    gridListTile: {
      textAlign: 'center',
      '&:hover': {
        '& $gridListTileBar': {
          height: 120,
          overflow: 'hidden',
        },
      },
    },
    gridListTileImgFullHeight: {
      width: '100%',
      position: 'relative',
      objectFit: 'contain',
      top: 'unset',
      left: 'unset',
      transform: 'unset',
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
    button: { margin: theme.spacing(1, 0, 1) },
    loading: { marginTop: theme.spacing(4) },
  });
});

export const Banners = () => {
  const classes = useStyles();
  const width = useWidth();
  const cols = getGrid(
    {
      md: 6,
      sm: 3,
      xs: 1,
    },
    width,
  );
  const { data, loading } = useProducts();

  if (loading)
    return (
      <Grid className={classes.loading} container justify="center">
        <CircularProgress size={80} />
      </Grid>
    );
  return (
    <GridList cellHeight={300} cols={cols} className={classes.root}>
      {data?.products.map((product, i) => {
        const { name, price, image } = product;
        return (
          <GridListTile
            key={i}
            className={classes.gridListTile}
            classes={{
              imgFullHeight: classes.gridListTileImgFullHeight,
            }}
          >
            <img
              src={(image && createAPIImageRoute(image)) || ''}
              alt={name}
            />
            <GridListTileBar
              title={name}
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
              className={classes.gridListTileBar}
              classes={{
                titleWrap: classes.titleWrap,
                title: classes.gridListTileBarTitle,
              }}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

export default Banners;
