import {
  makeStyles,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(1, 1, 2) },
}));

interface OrderDateProps {
  orderDate: string;
}

export const OrderInformation = ({ orderDate }: OrderDateProps) => {
  const classes = useStyles();
  const dateParsed = parseISO(orderDate);
  const date = format(dateParsed, 'dd-MM-Y');
  const time = format(dateParsed, 'H:mm');
  return (
    <Grid item xs={12}>
      <Grid container className={classes.root} alignItems="center">
        <Grid item xs={12}>
          <Typography
            color="primary"
            variant="subtitle2"
            gutterBottom
          >
            Información de la orden
          </Typography>
        </Grid>
        <Grid item xs={12} md>
          <Typography color="primary" variant="h6">
            Fecha: {date}
          </Typography>
        </Grid>
        <Grid item xs={12} md="auto">
          <Typography color="primary" variant="subtitle1">
            Hora: {time}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default OrderInformation;
