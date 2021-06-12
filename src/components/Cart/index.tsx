import React from 'react';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

  const [onBuy, { loading }] = useOnBuy();

  const handleClose = () => {
    onClose();
  };

  const title = 'Carrito de compras';

  const handleAction = async (action?: Action | number) => {
    if (action === Action.buy) {
      await onBuy();
      onClose();
      setActiveStep(0);
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

  const step = steps[activeStep];

  const mapButtons = step.buttons.map<StepButton>((button) => {
    if (isValidElementType(button)) return button;
    const { action } = button;
    return {
      ...button,
      disabled: loading || button.disabled,
      onClick: () => {
        handleAction(action);
      },
    };
  });

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
      <DialogContent className={classes.dialogContent}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(({ label, content }, i) => {
            const Content = content;
            return (
              <Step key={i}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Content />
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <StepActions
          {...{
            buttons: mapButtons,
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
