import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { useProducts } from 'contexts';
import { Loading } from 'components/Loading';
import Products from './Products';
import { Filter } from './Filter';
import EmptyProduct from './EmptyProduct';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));

export const Banners = () => {
  const classes = useStyles();
  const { data, loading, fetchMore } = useProducts();
  const grid = React.useRef<HTMLElement | null>(null);
  const call = React.useRef<boolean>(false);

  React.useEffect(() => {
    const remove = () => window.removeEventListener('scroll', event);
    const event = async () => {
      if (call.current) return;
      const target = grid.current;
      if (target && !loading) {
        const a =
          window.innerHeight + document.documentElement.scrollTop;
        const b = target.offsetTop + target.scrollHeight;
        if (a >= b) {
          call.current = true;
          await fetchMore();
          call.current = false;
        }
      }
    };
    window.addEventListener('scroll', event);
    return () => {
      remove();
    };
  }, [fetchMore, loading]);

  return (
    <div className={classes.root}>
      <Grid container spacing={4} innerRef={grid} justify="center">
        <Grid item xs={12}>
          <Filter />
        </Grid>
        {data && <Products data={data} />}
        {loading && <Loading />}
        {!loading && !data?.products?.data.length && (
          <Grid item container justify="center">
            <EmptyProduct />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Banners;
