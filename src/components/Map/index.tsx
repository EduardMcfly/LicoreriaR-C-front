import clsx from 'clsx';
import GoogleMapReact, { Props } from 'google-map-react';
import { makeStyles } from '@material-ui/core';

import { Marker } from './Marker';

const { REACT_APP_MAPS } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.spacing(50)}px)`,
    width: '100%',
    minHeight: theme.spacing(40),
  },
}));

type MapProps = Props & {
  className?: string;
};

const Map = (props: MapProps) => {
  const classes = useStyles();
  const { className, center, defaultZoom, ...rest } = props;
  return (
    <div className={clsx(classes.root, className)}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_MAPS }}
        defaultZoom={defaultZoom || 12}
        center={center}
        options={{ gestureHandling: 'greedy' }}
        {...rest}
      >
        {center && <Marker lat={center.lat} lng={center.lng} />}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
