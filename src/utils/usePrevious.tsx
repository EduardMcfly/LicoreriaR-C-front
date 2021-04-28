import React from 'react';

export function usePrevious<V extends any>(value: V) {
  const ref = React.useRef<V>(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
