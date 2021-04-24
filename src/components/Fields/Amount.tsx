import Input from '@material-ui/core/Input';
import FormControl, {
  FormControlProps,
} from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textCenter: {
    textAlign: 'center',
    width: '100%',
  },
}));

interface AmountProps {
  value: number;
  handleChange: (value: number) => void;
  formControlProps?: FormControlProps;
}

export const Amount = ({
  value,
  handleChange,
  formControlProps,
}: AmountProps) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth {...formControlProps}>
      <Typography variant="caption" align="center">
        Cantidad
      </Typography>
      <Input
        type="number"
        value={value || ''}
        classes={{ input: classes.textCenter }}
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
};
