import { Grid, ListItemText, Typography } from '@material-ui/core';
import currencyFormatter from 'currency-formatter';

interface UnitPriceProps {
  value: number;
  className?: string;
}

export function UnitPrice({ value, className }: UnitPriceProps) {
  return (
    <Grid container direction="column" className={className}>
      <Grid item xs>
        <Typography variant="caption" align="center">
          Precio unitario:
        </Typography>
      </Grid>
      <Grid item xs>
        <ListItemText
          primary={currencyFormatter.format(value, {
            code: 'COP',
            precision: 0,
          })}
        />
      </Grid>
    </Grid>
  );
}
