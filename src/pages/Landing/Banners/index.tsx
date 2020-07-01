import React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { getGrid, useWidth } from 'utils';
import { bannersList } from './bannersList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    gridListTile: {
      '&:hover': {
        '& $gridListTileBar': {
          height: 0,
          overflow: 'hidden',
        },
      },
    },
    gridListTileBar: { transition: `height 0.5s ease` },
  }),
);

export const Banners = () => {
  const classes = useStyles();
  const width = useWidth();
  const cols = getGrid(
    {
      md: 6,
      sm: 3,
      xs: 1,
    },
    width,
  );

  return (
    <GridList cellHeight={180} cols={cols} className={classes.root}>
      {bannersList.map(({ title, subTitle, image }, i) => {
        return (
          <GridListTile
            component={ButtonBase}
            key={i}
            className={classes.gridListTile}
          >
            <img src={image} alt={title} />
            <GridListTileBar
              title={title}
              subtitle={subTitle}
              className={classes.gridListTileBar}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

export default Banners;
