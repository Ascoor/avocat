declare module 'react/jsx-runtime' {
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
      mesh?: any;
      planeGeometry?: any;
      shaderMaterial?: any;
    }
  }

  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
