import Button, { ButtonProps } from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import { ShopProps, useShop } from 'contexts';
import React from 'react';
import { isValidElementType } from '../utils';

export interface StepButtonObject {
  label: React.ReactNode;
  state?: boolean;
  disabled?:
    | boolean
    | ((
        value: Pick<ShopProps, 'products' | 'map' | 'userInfo'>,
      ) => boolean);
  onClick?: () => void;
  buttonProps?: ButtonProps;
}

export type StepButtonComponent = React.ComponentType;
export type StepButton = StepButtonObject | StepButtonComponent;

interface StepActionsProps {
  buttons: StepButton[];
}

export const StepActions = ({ buttons }: StepActionsProps) => {
  const { products, map, userInfo } = useShop();
  return (
    <DialogActions>
      {buttons.map((button, i) => {
        if (isValidElementType(button)) {
          const Element: StepButtonComponent = button;
          return <Element key={i} />;
        }
        const {
          label,
          state = true,
          buttonProps,
          onClick,
        } = {
          ...button,
        };
        let { disabled = false } = {
          ...button,
        };
        if (typeof disabled === 'function') {
          disabled = disabled({ map, products, userInfo });
        }
        return (
          state && (
            <Button
              key={i}
              disabled={disabled}
              onClick={() => {
                onClick && onClick();
              }}
              color="secondary"
              {...buttonProps}
            >
              {label}
            </Button>
          )
        );
      })}
    </DialogActions>
  );
};
