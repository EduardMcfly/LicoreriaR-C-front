import GoogleMapReact from 'google-map-react';

import { useShop } from 'contexts';
import { Marker } from './Marker';

const { REACT_APP_MAPS } = process.env;

const Map = () => {
  const { map } = useShop();
  const { defaultCenter, defaultZoom, center, zoom, onChange } = map;

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_MAPS }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom || 12}
        center={center}
        zoom={zoom}
        onChange={(a) => {
          onChange(a);
          console.log(a);
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
