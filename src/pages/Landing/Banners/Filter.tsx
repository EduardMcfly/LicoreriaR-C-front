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
  const { loading, variables, setVariables, cancel } = useProducts();
  const [name, setName] = React.useState(() => variables.filter);
  const handler = React.useRef(
    throttle((value: string) => {
      cancel();
      setVariables({ filter: value });
    }, 1000),
  );

  React.useEffect(() => {
    if (!loading) handler.current.flush();
  }, [loading]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper className={classes.root}>
          <TextField
            onChange={({ target }) => {
              const value = target.value;
              setName(value);
              handler.current(value);
            }}
            placeholder="Busque sus productos..."
            value={name || ''}
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
