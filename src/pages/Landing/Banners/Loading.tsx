import { CircularProgress, Grid } from '@material-ui/core';

export const Loading = () => {
  return (
    <Grid container item xs={12} justify="center">
      <div>
        <CircularProgress size={80} />
      </div>
    </Grid>
  );
};
