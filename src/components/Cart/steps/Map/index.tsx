import GoogleMapReact from 'google-map-react';

import { useShop } from 'contexts';
import { Marker } from './Marker';
import { makeStyles } from '@material-ui/core';

const { REACT_APP_MAPS } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.spacing(50)}px)`,
    width: '100%',
    minHeight: theme.spacing(40),
  },
}));

const Map = () => {
  const classes = useStyles();
  const { map } = useShop();
  const { defaultCenter, defaultZoom, center, zoom, onChange } = map;

  return (
    <div className={classes.root}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_MAPS }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom || 12}
        center={center}
        zoom={zoom}
        onChange={(a) => {
          onChange(a);
        }}
        onClick={({ lat, lng }) => {
          onChange({ center: { lat, lng } });
        }}
      >
        {center && <Marker lat={center.lat} lng={center.lng} />}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
