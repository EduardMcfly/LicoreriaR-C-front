import { Grid, ListItemText, Typography } from '@material-ui/core';
import currencyFormatter from 'currency-formatter';

interface TotalPriceProps {
  className?: string;
  amount: number;
  price: number;
}

export function TotalPrice(props: TotalPriceProps) {
  return (
    <Grid container direction="column" className={props.className}>
      <Grid item xs>
        <Typography variant="caption" align="center">
          Precio total:
        </Typography>
      </Grid>
      <Grid item xs>
        <ListItemText
          primary={currencyFormatter.format(
            props.price * props.amount,
            {
              code: 'COP',
              precision: 0,
            },
          )}
        />
      </Grid>
    </Grid>
  );
}
