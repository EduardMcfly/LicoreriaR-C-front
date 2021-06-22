import { Grid, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import currencyFormatter from 'currency-formatter';
import { makeStyles } from '@material-ui/core/styles';

import { currencyFormat } from 'constantsApp';

const useStyles = makeStyles((theme) => ({
  totalDivider: {
    width: '100%',
  },
  text: { marginTop: theme.spacing(1) },
}));

export const Total = ({ total }: { total: number }) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} justify="center">
      <Divider className={classes.totalDivider} />
      <Typography className={classes.text} variant="subtitle1">
        Total:{' '}
        <b>{currencyFormatter.format(total, currencyFormat)}</b>
      </Typography>
    </Grid>
  );
};
