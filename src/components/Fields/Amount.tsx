import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl, {
  FormControlProps,
} from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

interface AmountProps {
  value: number;
  handleChange: (value: number) => void;
  formControlProps?: FormControlProps;
}

export const Amount = ({
  value,
  handleChange,
  formControlProps,
}: AmountProps) => (
  <FormControl fullWidth {...formControlProps}>
    <InputLabel>Cantidad</InputLabel>
    <Input
      type="number"
      value={value || ''}
      startAdornment={
        <IconButton
          color="primary"
          aria-label="reduce"
          onClick={() => {
            handleChange(Math.max(value - 1, 0));
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      }
      endAdornment={
        <IconButton
          color="primary"
          aria-label="increase"
          onClick={() => {
            handleChange(value + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      }
      onChange={({ target: { value } }) => handleChange(+value)}
      disableUnderline
    />
  </FormControl>
);
