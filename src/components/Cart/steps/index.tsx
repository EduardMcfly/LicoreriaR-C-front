import React from 'react';

import { Products } from './Products';
import Map from './Map';
import { StepButtonObject, StepButtonComponent } from './StepActions';
import { Action } from './common';

interface StepType {
  label: React.ReactNode;
  content: React.ComponentType;
  buttons: (
    | (StepButtonObject & {
        action?: number | Action;
      })
    | StepButtonComponent
  )[];
}

export const steps: StepType[] = [
  {
    label: 'Productos',
    content: Products,
    buttons: [
      { label: 'Atrás', disabled: true },
      {
        label: 'Siguiente',
        action: Action.next,
        disabled: ({ products }) =>
          !products.length ||
          !products.every(({ amount }) => !!amount),
      },
    ],
  },
  {
    label: 'Selecciona tu ubicación',
    content: Map,
    buttons: [
      {
        label: 'Atrás',
        action: Action.back,
        buttonProps: { color: 'primary' },
      },
      {
        label: 'Comprar',
        action: Action.buy,
        disabled: ({ map }) => !map.center,
      },
    ],
  },
];

export default steps;
