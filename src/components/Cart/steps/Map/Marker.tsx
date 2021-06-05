import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core';

interface MarkerProps {
  lat: number;
  lng: number;
}

const useStyles = makeStyles(() => ({
  marker: {
    position: 'absolute',
    bottom: '0px',
    transform: 'translate(-50%)',
  },
}));

export const Marker = (_props: MarkerProps) => {
  const classes = useStyles();
  return (
    <div className={classes.marker}>
      <RoomIcon color="primary" fontSize={'large'} />
    </div>
  );
};
