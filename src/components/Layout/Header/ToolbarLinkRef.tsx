import React from 'react';
import { ToolbarProps, ButtonBase } from '@material-ui/core';
import { Link as LinkRouter } from 'react-router-dom';

export const ToolbarLinkRef = React.forwardRef<
  HTMLElement,
  ToolbarProps & {
    to: string;
  }
>(({ className, children, to }, ref) => {
  return (
    <ButtonBase
      component={LinkRouter}
      innerRef={ref}
      className={className}
      to={to}
    >
      {children}
    </ButtonBase>
  );
});
