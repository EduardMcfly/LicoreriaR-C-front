import { Icon404 } from 'assets/icons/Icon404';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { width: theme.spacing(30) },
}));

export const EmptyProduct = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon404 />
      <Typography color="primary" variant="h6" align="center">
        No se encontró ningún producto
      </Typography>
    </div>
  );
};

export default EmptyProduct;
