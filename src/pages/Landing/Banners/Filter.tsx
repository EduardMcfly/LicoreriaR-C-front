import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Paper } from '@material-ui/core';
import { useProducts } from 'contexts';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import throttle from 'lodash/throttle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
}));

export const Filter = () => {
  const classes = useStyles();
  const { variables, setVariables } = useProducts();
  const [name, setName] = React.useState(variables.filter);
  const handler = React.useRef(
    throttle((value: string) => {
      console.log(value);
      setVariables({ filter: value });
    }, 2000),
  );
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper className={classes.root}>
          <TextField
            onChange={({ target }) => {
              setName(target.value);
              handler.current(target.value);
            }}
            placeholder="Busque sus productos..."
            value={name}
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
};
