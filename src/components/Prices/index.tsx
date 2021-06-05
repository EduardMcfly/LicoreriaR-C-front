import { Grid, GridSize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import { UnitPrice } from './UnitPrice';
import { TotalPrice } from './TotalPrice';
import {
  Breakpoint,
  keys,
} from '@material-ui/core/styles/createBreakpoints';

type Breakpoints = Partial<Record<Breakpoint, boolean | GridSize>>;

interface PricesProps extends Breakpoints {
  amount: number;
  price: number;
  showTotal?: boolean;
}

export const useStyles = makeStyles(() => ({
  textCenter: {
    textAlign: 'center',
  },
}));

export function Prices({
  amount,
  price,
  showTotal = true,
  ...rest
}: PricesProps) {
  const classes = useStyles();
  const breakpoints = keys.reduce<Breakpoints>(
    (p, c) => ({ ...p, [c]: rest[c] }),
    {},
  );
  return (
    <>
      <Grid item {...breakpoints}>
        <UnitPrice value={price} className={classes.textCenter} />
      </Grid>
      {showTotal && (
        <Grid item {...breakpoints}>
          <TotalPrice
            amount={amount}
            price={price}
            className={classes.textCenter}
          />
        </Grid>
      )}
    </>
  );
}
