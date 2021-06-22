import { Grid, ListItemText, Typography } from '@material-ui/core';
import currencyFormatter from 'currency-formatter';

import { currencyFormat } from 'constantsApp';

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
            currencyFormat,
          )}
        />
      </Grid>
    </Grid>
  );
}
