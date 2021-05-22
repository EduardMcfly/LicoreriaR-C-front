import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { useProducts } from 'contexts';

import Products from './Products';
import { Loading } from './Loading';

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
  console.log(loading);

  return (
    <div className={classes.root}>
      <Grid container spacing={4} innerRef={grid}>
        {data && <Products data={data} />}
        {loading && <Loading />}
      </Grid>
    </div>
  );
};

export default Banners;
