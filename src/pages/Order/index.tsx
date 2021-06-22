import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

import { useOrder } from 'graphqlAPI';
import { Header } from 'components/Layout/Header';
import { Loading } from 'components/Loading';
import { Total } from './Total';
import { Product } from './product';

type OrderProps = RouteComponentProps<{
  id: string;
}>;

const useStyles = makeStyles((theme) => ({
  toolbar: { justifyContent: 'center' },
  content: {
    margin: theme.spacing(4, 4),
    [theme.breakpoints.down('md')]: { margin: theme.spacing(4, 2) },
  },
  paper: { padding: theme.spacing(1) },
  loading: { padding: theme.spacing(3) },
}));
export const Order = ({ match }: OrderProps) => {
  const classes = useStyles();

  const { id } = match.params;
  const { data, loading } = useOrder({ variables: { id } });

  const products = data?.order?.products;
  const total = React.useMemo(
    () =>
      products?.reduce(
        (p, { amount, unitPrice }) => p + amount * unitPrice,
        0,
      ),
    [products],
  );

  return (
    <>
      <Header
        items={false}
        toolbarProps={{ className: classes.toolbar }}
      />
      <div className={classes.content}>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={7} lg={6} xl={5}>
            <Paper elevation={4} className={classes.paper}>
              <Grid container>
                {loading && (
                  <Grid item xs={12} className={classes.loading}>
                    <Loading />
                  </Grid>
                )}
                {products?.map((product) => (
                  <Product {...{ product }} />
                ))}
                {total && <Total {...{ total }} />}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Order;
