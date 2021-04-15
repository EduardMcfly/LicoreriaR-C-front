import { makeStyles } from '@material-ui/core';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    background: theme.palette.background.paper,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  circularProgressRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
}));

export const DialogContentLoading = (
  props: CircularProgressProps,
) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.loading} />
      <div className={classes.circularProgressRoot}>
        <CircularProgress {...props} />
      </div>
    </>
  );
};
