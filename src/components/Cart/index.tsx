import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  makeStyles,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import steps from './steps';
import { StepActions, StepButton } from './steps/StepActions';
import { Action, useOnBuy } from './steps/common';
import { isValidElementType } from './utils';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialogActions: {
    justifyContent: 'center',
  },
}));

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDialog({
  open,
  onClose,
}: CartDialogProps) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = React.useState(0);

  const onBuy = useOnBuy();

  const handleClose = () => {
    onClose();
  };

  const title = 'Carrito de compras';

  const handleAction = (action?: Action | number) => {
    if (action === Action.buy) {
      onBuy();
      return;
    }
    const getNewActiveStep = () => {
      if (action === Action.back) return activeStep - 1;
      if (action === Action.next) return activeStep + 1;
      return action || activeStep;
    };
    const newActiveStep = getNewActiveStep();
    if (newActiveStep >= 0 && newActiveStep <= steps.length)
      setActiveStep(newActiveStep);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="xl"
    >
      {fullScreen && (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.title}>{title}</Typography>
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
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(({ label, content, buttons }, i) => {
            const Content = content;
            const mapButtons = buttons.map<StepButton>((button) => {
              if (isValidElementType(button)) return button;
              const { action } = button;
              return {
                ...button,
                onClick: () => {
                  handleAction(action);
                },
              };
            });
            return (
              <Step key={i}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Content />
                  <StepActions
                    {...{
                      buttons: mapButtons,
                    }}
                  />
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          autoFocus
          size="small"
          onClick={handleClose}
          color="primary"
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
