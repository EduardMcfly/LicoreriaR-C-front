import React from 'react';

import { Products } from './Products';
import Map from './Map';
import { StepButtonObject } from './StepActions';
import { Action } from './common';

interface StepType {
  label: React.ReactNode;
  content: React.ComponentType;
  buttons: (
    | (StepButtonObject & {
        action?: number | Action;
      })
    | React.ElementType
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
        disabled: ({ products }) => !products.length,
      },
    ],
  },
  {
    label: 'Tu ubicación',
    content: Map,
    buttons: [
      { label: 'Atrás', action: Action.back },
      {
        label: 'Comprar',
        action: Action.buy,
        disabled: ({ map }) => !map.center,
      },
    ],
  },
];

export default steps;
