import {
  makeStyles,
  Typography,
  Avatar,
  emphasize,
  Grid,
  fade,
} from '@material-ui/core';

import { AppName } from 'constantsApp';
import logo from 'assets/logo.png';

const useStyles = makeStyles((theme) => {
  const color = theme.palette.background.paper;
  return {
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      background: fade(emphasize(color, 1), 0.5),
      color,
    },
    icon: {
      margin: theme.spacing(0, 2, 0, 0),
    },
  };
});

export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
        >
          <Avatar src={logo} className={classes.icon} />
          <Typography variant="body1">{AppName}</Typography>{' '}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center" paragraph>
            🌻 <i>Eduard Andres Castellanos</i> 🌻
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
