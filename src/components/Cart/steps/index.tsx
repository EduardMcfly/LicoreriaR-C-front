import React from 'react';

import { Products } from './Products';
import Map from './Map';
import { StepButtonObject } from './StepActions';
import { Go } from './common';

interface StepType {
  label: React.ReactNode;
  content: React.ComponentType;
  buttons: (
    | (StepButtonObject & {
        go?: number | Go;
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
        go: Go.next,
        disabled: ({ products }) => !products.length,
      },
    ],
  },
  {
    label: 'Tu ubicación',
    content: Map,
    buttons: [
      { label: 'Atrás', go: Go.back },
      {
        label: 'Comprar',
        go: Go.buy,
        disabled: ({ map }) => !map.center,
      },
    ],
  },
];

export default steps;
