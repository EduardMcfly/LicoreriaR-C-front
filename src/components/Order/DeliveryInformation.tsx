import {
  makeStyles,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import differenceInMinutes from 'date-fns/differenceInMinutes';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(1, 1, 2) },
}));

interface OrderDateProps {
  deliveryDate?: string;
  orderDate?: string;
}

export const DeliveryInformation = ({
  deliveryDate,
  orderDate,
}: OrderDateProps) => {
  const classes = useStyles();
  const dateParsed = deliveryDate && parseISO(deliveryDate);
  const orderDateParsed = orderDate && parseISO(orderDate);

  const dateTime = dateParsed && format(dateParsed, 'dd-MM-Y H:mm');

  const deliveryDifference =
    !dateTime &&
    orderDateParsed &&
    differenceInMinutes(new Date(), orderDateParsed);

  const deliveryCanceled =
    deliveryDifference && deliveryDifference > 60;

  const deliveryDelayed =
    !deliveryCanceled && deliveryDifference && deliveryDifference > 1;

  const hasProblem = deliveryDelayed || deliveryCanceled;

  return (
    <Grid item xs={12}>
      <Grid container className={classes.root} alignItems="center">
        <Grid item xs={12}>
          <Typography
            color="primary"
            variant="subtitle2"
            align="center"
            gutterBottom
          >
            Información de entrega
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {(dateTime && (
            <Typography color="primary" variant="h6" align="center">
              Entregado el {dateTime}
            </Typography>
          )) ||
            (!hasProblem && (
              <Typography color="primary" variant="h6" align="center">
                Se está preparando la entrega
              </Typography>
            ))}
          {hasProblem && (
            <Typography color="error" variant="h6" align="center">
              {deliveryCanceled && 'La entrega se cancelo'}
              {deliveryDelayed && 'La entrega se retrasó'}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default DeliveryInformation;
