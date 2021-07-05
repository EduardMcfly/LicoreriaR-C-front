import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';

import { useOrder } from 'graphqlAPI';
import { Header } from 'components/Layout/Header';
import { Loading } from 'components/Loading';
import { Product } from './product';
import {
  OrderInformation,
  Total,
  EmptyOrder,
  Location,
  DeliveryInformation,
} from '../../components/Order';

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

  const { products, location, orderDate, deliveryDate } = {
    ...data?.order,
  };
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
        <Grid
          container
          justify="center"
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Orden
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={10} md={7} lg={6} xl={8}>
            <Paper elevation={4} className={classes.paper}>
              <Grid container>
                {loading && (
                  <Grid item xs={12} className={classes.loading}>
                    <Loading />
                  </Grid>
                )}
                {orderDate && <OrderInformation {...{ orderDate }} />}
                {!loading && (
                  <DeliveryInformation
                    {...{ deliveryDate, orderDate }}
                  />
                )}
                {products?.map((product) => (
                  <Product key={product.id} {...{ product }} />
                ))}
                {!loading && !products?.length && (
                  <Grid container item xs={12} justify="center">
                    <EmptyOrder />
                  </Grid>
                )}
                {total && <Total {...{ total }} />}
              </Grid>
            </Paper>
          </Grid>
          {location && (
            <Grid item xs={12} xl={4}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} sm={10} md={7} lg={6} xl={12}>
                  <Paper elevation={4} className={classes.paper}>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      gutterBottom
                    >
                      Lugar de entrega
                    </Typography>
                    <Location location={location} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Order;
