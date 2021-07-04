import React from 'react';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { getMinDateTime, useShop, dateFormat } from 'contexts';
import { maxDaysOrder } from '../../constants';

export const OrderDetails = () => {
  const { userInfo } = useShop();

  const [now, setNow] = React.useState(getMinDateTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newNow = getMinDateTime();
      if (+newNow > +now) setNow(newNow);
    }, 1000);
    return () => clearInterval(interval);
  }, [now]);

  const { orderDate, orderTime, onChange } = userInfo;

  const getDate = (date: Date | number): string => {
    try {
      return format(date, dateFormat);
    } catch (error) {
      return getDate(new Date());
    }
  };

  const date = orderDate;
  const time = orderTime;
  const minDateFormat = getDate(now);

  return (
    <Grid>
      <Typography gutterBottom variant="body2">
        Datos del pedido
      </Typography>
      <TextField
        label="Fecha"
        name="date"
        value={date}
        onChange={({ target: { value } }) => {
          onChange({
            orderDate: value,
          });
        }}
        margin="dense"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{
          max: getDate(addDays(new Date(), maxDaysOrder)),
          min: minDateFormat,
        }}
      />
      <TextField
        label="Hora"
        name="hour"
        value={time}
        onChange={({ target: { value } }) => {
          onChange({ orderTime: value });
        }}
        margin="dense"
        type="time"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: format(now, 'HH:mm'),
        }}
      />
    </Grid>
  );
};

export default OrderDetails;
