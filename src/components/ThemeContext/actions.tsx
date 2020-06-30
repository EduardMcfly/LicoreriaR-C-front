import React from 'react';
import { Direction } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { PaletteType } from '@material-ui/core';

import { getCookie } from '../../utils/helpers';

export interface ThemeOptionsReducer {
  dense: boolean;
  direction: Direction;
  paletteColors: PaletteOptions;
  paletteType: PaletteType;
  spacing: number;
}

/**
 * @description `Here is get the paletteColors of cookies`
 */
const paletteColors = JSON.parse(getCookie('paletteColors') || '{}');
const paletteType: PaletteType =
  (getCookie('paletteType') as any) || 'light';
export const themeInitialOptions: ThemeOptionsReducer = {
  dense: false,
  direction: 'ltr',
  paletteColors,
  paletteType,
  spacing: 8, // spacing unit
};

export enum Actions {
  SET_SPACING,
  INCREASE_SPACING,
  DECREASE_SPACING,
  SET_DENSE,
  RESET_DENSITY,
  RESET_COLORS,
  CHANGE,
}

export interface ActionSetSpacing {
  type: Actions.SET_SPACING;
  payload: number;
}

export interface ActionIncreaseSpacing {
  type: Actions.INCREASE_SPACING;
  payload: number;
}

export interface ActionDecreaseSpacing {
  type: Actions.DECREASE_SPACING;
  payload: number;
}

export interface ActionSetDense {
  type: Actions.SET_DENSE;
  payload: boolean;
}

export interface ActionResetDensity {
  type: Actions.RESET_DENSITY;
}

export interface ActionResetColors {
  type: Actions.RESET_COLORS;
  payload: number;
}

export interface ActionChange {
  type: Actions.CHANGE;
  payload: Partial<
    Pick<
      ThemeOptionsReducer,
      'paletteColors' | 'paletteType' | 'direction'
    >
  >;
}

export type actionsReducer =
  | ActionSetSpacing
  | ActionIncreaseSpacing
  | ActionDecreaseSpacing
  | ActionSetDense
  | ActionResetDensity
  | ActionResetColors
  | ActionChange;
export const reducer: React.Reducer<
  ThemeOptionsReducer,
  | actionsReducer
  | {
      type: string;
    }
> = (state, action): ThemeOptionsReducer => {
  switch (action.type) {
    case Actions.SET_SPACING:
      return {
        ...state,
        spacing: action.payload,
      };
    case Actions.INCREASE_SPACING: {
      return {
        ...state,
        spacing: action.payload + 1,
      };
    }
    case Actions.DECREASE_SPACING: {
      return {
        ...state,
        spacing: action.payload - 1,
      };
    }
    case Actions.SET_DENSE:
      return {
        ...state,
        dense: action.payload,
      };
    case Actions.RESET_DENSITY:
      return {
        ...state,
        dense: themeInitialOptions.dense,
        spacing: themeInitialOptions.spacing,
      };
    case Actions.RESET_COLORS:
      return {
        ...state,
        paletteColors: themeInitialOptions.paletteColors,
      };
    case Actions.CHANGE:
      return {
        ...state,
        paletteType: action.payload.paletteType || state.paletteType,
        direction: action.payload.direction || state.direction,
        paletteColors:
          action.payload.paletteColors || state.paletteColors,
      };
    default:
      throw new Error(`Unrecognized type ${action.type}`);
  }
};
