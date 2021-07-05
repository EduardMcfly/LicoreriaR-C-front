import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

import { useShop } from 'contexts/Shop';
import {
  OrderInformation,
  DeliveryInformation,
  Total,
  Location,
} from 'components/Order';
import { Product } from 'pages/Order/product';

export const Result = () => {
  const { orders } = useShop();
  const [order] = orders;
  const classes: any = {};
  const { products, location, orderDate, deliveryDate } = {
    ...order,
  };

  const total = React.useMemo(
    () =>
      products?.reduce(
        (p, { amount, unitPrice }) => p + amount * unitPrice,
        0,
      ),
    [products],
  );
  if (!order) return null;

  return (
    <div className={classes.content}>
      <Grid
        container
        justify="center"
        spacing={2}
        alignItems="center"
      >
        <Grid item xs={12} sm={10} md={7} lg={6} xl={8}>
          <Paper elevation={4} className={classes.paper}>
            <Grid container>
              {orderDate && <OrderInformation {...{ orderDate }} />}
              <DeliveryInformation {...{ deliveryDate, orderDate }} />
              {products?.map((product) => (
                <Product key={product.id} {...{ product }} />
              ))}
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
  );
};

export default Result;
