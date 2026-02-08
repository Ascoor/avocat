declare module 'react' {
  export type ReactNode = any;
  export type ReactElement = any;
  export type ReactPortal = any;
  export type ReactFragment = any;
  export type FC<P = any> = (props: P) => any;
  export type FunctionComponent<P = any> = FC<P>;
  export type ComponentType<P = any> = (props: P) => any;
  export type ElementType = any;
  export type PropsWithChildren<P = any> = P & { children?: ReactNode };
  export interface RefAttributes<T> {
    ref?: any;
  }
  export type ComponentProps<T> = any;
  export type ComponentPropsWithoutRef<T> = any;
  export type ComponentPropsWithRef<T> = any;
  export type ElementRef<T> = any;
  export type HTMLAttributes<T> = any;
  export type CSSProperties = any;
  export type SVGProps<T = any> = any;
  export type ThHTMLAttributes<T = any> = any;
  export type TdHTMLAttributes<T = any> = any;
  export type TextareaHTMLAttributes<T = any> = any;
  export type KeyboardEvent<T = any> = any;
  export type MutableRefObject<T> = { current: T };
  export type ForwardedRef<T> = any;
  export interface Context<T> {
    Provider: any;
    Consumer: any;
  }
  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(context: any): any;
  export function useState<T>(initial?: T): any;
  export function useEffect(effect: any, deps?: any[]): void;
  export function useLayoutEffect(effect: any, deps?: any[]): void;
  export function useMemo<T = any>(factory: any, deps?: any[]): T;
  export function useCallback<T = any>(callback: any, deps?: any[]): T;
  export function useRef<T>(initial?: T): MutableRefObject<T>;
  export function useId(): string;
  export function forwardRef<T, P = any>(render: any): any;
  export const Suspense: any;
  export const StrictMode: any;
  export const Fragment: any;
  export const createElement: any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
