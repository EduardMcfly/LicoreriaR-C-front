import { makeStyles } from '@material-ui/core';

import { useShop } from 'contexts';
import MapBase from 'components/Map';

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
      <MapBase
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
      />
    </div>
  );
};

export default Map;
