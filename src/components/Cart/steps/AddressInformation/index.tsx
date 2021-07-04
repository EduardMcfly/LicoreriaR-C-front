import TextField from '@material-ui/core/TextField';

import { useShop } from 'contexts/Shop';
import Map from './Map';

export const AddressInformation = () => {
  const { userInfo } = useShop();

  const { name, onChange } = userInfo;
  return (
    <>
      <TextField
        label="Nombre completo"
        name="name"
        value={name}
        onChange={({ target: { value } }) => {
          onChange({ name: value });
        }}
        margin="dense"
        type="text"
        autoFocus
        fullWidth
      />
      <Map />
    </>
  );
};

export default AddressInformation;
