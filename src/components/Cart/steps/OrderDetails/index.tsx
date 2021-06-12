import parse from 'date-fns/parse';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import addMinutes from 'date-fns/addMinutes';
import differenceInDays from 'date-fns/differenceInDays';
import addDays from 'date-fns/addDays';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useShop } from 'contexts';
import { maxDaysOrder, minDeliveryTime } from '../../constants';

const dateFormat = 'yyyy-MM-dd';

export const OrderDetails = () => {
  const { userInfo } = useShop();
  const { name, orderDate, orderTime, onChange } = userInfo;

  const getDate = (date: Date | number): string => {
    try {
      return format(date, dateFormat);
    } catch (error) {
      return getDate(new Date());
    }
  };
  const date = getDate(orderDate);
  const time = orderTime;
  const minDate = new Date().setHours(0, 0, 0, 0);
  const minDateFormat = getDate(new Date().setHours(0, 0, 0, 0));
  return (
    <Grid>
      <TextField
        label="Nombre completo"
        name="name"
        value={name}
        onChange={({ target: { value } }) => {
          onChange({ name: value });
        }}
        margin="dense"
        type="text"
        autoFocus
        fullWidth
      />
      <Typography gutterBottom variant="body2">
        Datos del pedido
      </Typography>
      <TextField
        label="Fecha"
        name="date"
        value={date}
        onChange={({ target: { value } }) => {
          const newValue = parse(value, dateFormat, new Date());
          if (!isNaN(+newValue)) onChange({ orderDate: newValue });
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
          const formatTime = 'HH:mm';

          const someDay = differenceInDays(orderDate, minDate) === 0;

          if (someDay) {
            const min = addMinutes(new Date(), minDeliveryTime);
            onChange({
              orderTime: isBefore(parse(value, formatTime, min), min)
                ? format(min, formatTime)
                : value,
            });
          } else
            onChange({
              orderTime: value,
            });
        }}
        margin="dense"
        type="time"
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: format(new Date(), 'HH:mm'),
        }}
      />
    </Grid>
  );
};

export default OrderDetails;
