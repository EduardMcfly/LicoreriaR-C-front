import {
  FormControl,
  InputLabel,
  makeStyles,
} from '@material-ui/core';

import { useShop } from 'contexts';
import MapBase from 'components/Map';

const useStyles = makeStyles((theme) => ({
  mapRoot: {
    marginTop: theme.spacing(3),
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
    <div>
      <FormControl fullWidth margin="dense">
        <InputLabel margin="dense" shrink>
          Selecciona tu ubicación
        </InputLabel>
        <div className={classes.mapRoot}>
          <MapBase
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom || 12}
            center={center}
            zoom={zoom}
            onClick={({ lat, lng }) => {
              onChange({ center: { lat, lng } });
            }}
            options={{
              fullscreenControl: false,
            }}
          />
        </div>
      </FormControl>
    </div>
  );
};

export default Map;
