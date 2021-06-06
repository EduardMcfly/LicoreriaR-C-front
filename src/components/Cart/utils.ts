import React from 'react';
import * as ReactIs from 'react-is';

export const isValidElementType = (
  value: any,
): value is React.ComponentType => ReactIs.isValidElementType(value);
