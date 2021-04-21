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
import beer from 'assets/beer.png';

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
      objectFit: 'contain',
      padding: theme.spacing(2),
      width: '100%',
      top: 'unset',
      left: 'unset',
      transform: 'unset',
      height: 'unset',
    },
    gridListTileImgFullWidth: {
      objectFit: 'contain',
      padding: theme.spacing(2),
      width: '100%',
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
    button: { margin: theme.spacing(1, 0, 1) },
    loading: { marginTop: theme.spacing(4) },
  });
});

export const Banners = () => {
  const classes = useStyles();
  const width = useWidth();
  const cols = getGrid(
    {
      xs: 1,
      sm: 3,
      md: 6,
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
      {data?.products.data.map((product, i) => {
        const { name, price, image } = product;
        return (
          <GridListTile
            key={product.id}
            className={classes.gridListTile}
            classes={{
              imgFullHeight: classes.gridListTileImgFullHeight,
              imgFullWidth: classes.gridListTileImgFullWidth,
              tile: classes.gridListTileTile,
            }}
          >
            <img
              src={(image && createAPIImageRoute(image)) || beer}
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
