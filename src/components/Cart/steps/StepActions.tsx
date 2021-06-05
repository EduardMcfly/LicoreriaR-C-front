import * as ReactIs from 'react-is';
import Button, { ButtonProps } from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import { ShopProps, useShop } from 'contexts';
import React from 'react';

export interface StepButtonObject {
  label: React.ReactNode;
  state?: boolean;
  disabled?:
    | boolean
    | ((value: Pick<ShopProps, 'products' | 'map'>) => boolean);
  onClick?: () => void;
  buttonProps?: ButtonProps;
}

export type StepButton = StepButtonObject | React.ElementType;

interface StepActionsProps {
  buttons: StepButton[];
}

export const StepActions = ({ buttons }: StepActionsProps) => {
  const { products, map } = useShop();
  return (
    <DialogActions>
      {buttons.map((button, i) => {
        if (ReactIs.isValidElementType(button)) {
          const Element: React.ElementType = button;
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
          disabled = disabled({ map, products });
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
