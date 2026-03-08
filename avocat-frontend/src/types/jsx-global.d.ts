import type { ReactNode } from 'react';

declare global {
  namespace JSX {
    type Element = any
    interface IntrinsicElements {
      [elemName: string]: any;
      mesh?: any;
      planeGeometry?: any;
      shaderMaterial?: any;
    }
  }

  type Children = ReactNode | ReactNode[];
}

export {};
