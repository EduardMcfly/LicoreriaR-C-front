import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 'auto',
  },
}));
export const Items = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button color="secondary">Hacer un pedido</Button>
    </div>
  );
};
