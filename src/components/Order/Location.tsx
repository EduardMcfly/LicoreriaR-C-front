import { makeStyles } from '@material-ui/core';

import { OrderLocation } from 'graphqlAPI';
import Map from 'components/Map';

const useStyles = makeStyles((theme) => ({
  map: {
    height: theme.spacing(40),
    width: '100%',
    minHeight: theme.spacing(40),
  },
}));

interface LocationProps {
  location: OrderLocation;
}

export const Location = ({ location }: LocationProps) => {
  const classes = useStyles();
  const { lat, lng } = location;

  return (
    <Map center={{ lat, lng }} zoom={18} className={classes.map} />
  );
};

export default Location;
