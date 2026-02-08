import type { ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  type Children = ReactNode | ReactNode[];
}

export {};
