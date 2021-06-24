import { Icon404 } from 'assets/icons/Icon404';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { width: theme.spacing(40) },
}));

export const EmptyOrder = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon404 />
      <Typography color="error" variant="h6" align="center" paragraph>
        Tu orden no fue encontrada
      </Typography>
    </div>
  );
};

export default EmptyOrder;
