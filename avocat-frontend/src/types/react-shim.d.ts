import type React from 'react';

declare global {
  namespace ReactShim {
    type Element = React.ReactElement;
  }
}

export {};
