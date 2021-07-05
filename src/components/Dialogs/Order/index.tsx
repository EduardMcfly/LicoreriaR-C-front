import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { DialogContentLoading } from '../../Dialog';
import { useShop } from 'contexts/Shop';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  fillFlex: {
    flex: 1,
  },
  dialogContent: {
    padding: 0,
  },
  dialogActions: {
    justifyContent: 'center',
  },
  loadingRoot: {
    position: 'relative',
  },
}));

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderDialog({
  open,
  onClose,
}: CartDialogProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { orders } = useShop();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [order] = orders;
  if (!order) return null;

  const handleClose = () => {
    onClose();
  };

  const title = 'Su pedido';

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xl"
    >
      {fullScreen && (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography
              className={clsx(classes.title, classes.fillFlex)}
            >
              {title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      {!fullScreen && (
        <Toolbar>
          <Typography variant="h5" className={classes.fillFlex}>
            {title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      )}
      <DialogContent
        className={clsx(classes.dialogContent, classes.loadingRoot)}
      >
        {order.id}
        <DialogContentLoading size={60} color="secondary" />
      </DialogContent>
    </Dialog>
  );
}
