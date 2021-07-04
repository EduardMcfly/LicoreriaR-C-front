import React from 'react';

import { Products } from './Products';
import { OrderDetails } from './OrderDetails';
import { StepButtonObject, StepButtonComponent } from './StepActions';
import { Action } from './common';
import AddressInformation from './AddressInformation';

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
    label: 'Detalles de su pedido',
    content: OrderDetails,
    buttons: [
      {
        label: 'Atrás',
        action: Action.back,
        buttonProps: { color: 'primary' },
      },
      {
        label: 'Siguiente',
        action: Action.next,
        disabled: ({ userInfo }) =>
          !userInfo.orderDate || !userInfo.orderTime,
      },
    ],
  },
  {
    label: 'Información del domicilio',
    content: AddressInformation,
    buttons: [
      {
        label: 'Atrás',
        action: Action.back,
        buttonProps: { color: 'primary' },
      },
      {
        label: 'Comprar',
        action: Action.buy,
        disabled: ({ map, userInfo }) =>
          !map.center || !userInfo.name,
      },
    ],
  },
];

export default steps;
