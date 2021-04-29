import clsx from 'clsx';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  img: {
    color: 'transparent',
    height: '100%',
    objectFit: 'cover',
    textAlign: 'center',
    textIndent: '10000px',
  },
}));

export const AvatarProduct = (props: AvatarProps) => {
  const classes = useStyles();
  const { imgProps } = props;
  return (
    <Avatar
      {...props}
      imgProps={{
        className: clsx(classes.img, imgProps?.className),
        ...imgProps,
      }}
    />
  );
};
export default AvatarProduct;
