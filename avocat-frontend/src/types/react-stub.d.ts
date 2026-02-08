declare module 'react' {
  export type DependencyList = ReadonlyArray<unknown>;
  export type ReactNode = any;
  export type ReactChild = any;
  export type ReactFragment = any;
  export type ReactPortal = any;
  export type ReactInstance = any;
  export type Key = string | number;
  export type ErrorInfo = any;

  export type ReactElement<P = any, T = any> = any;

  export interface MutableRefObject<T> {
    current: T;
  }

  export interface RefObject<T> {
    current: T | null;
  }

  export type Ref<T> = any;
  export type RefCallback<T> = any;
  export type ForwardedRef<T> = any;

  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);

  export type ElementType<P = any> = any;
  export type ComponentClass<P = any> = abstract new (...args: any[]) => any;
  export type ComponentType<P = any> = ComponentClass<P> | FunctionComponent<P>;
  export type ComponentRef<T> = any;
  export type ElementRef<T> = any;
  export class PureComponent<P = any, S = any> extends Component<P, S> {}
  export type FunctionComponent<P = any> = any;
  export type FC<P = any> = any;
  export type ExoticComponent<P = any> = any;
  export type MemoExoticComponent<T = any> = any;
  export type ForwardRefExoticComponent<P = any> = any;
  export type JSXElementConstructor<P = any> = any;

  export interface Attributes {
    [key: string]: any;
  }

  export interface RefAttributes<T> extends Attributes {
    ref?: any;
  }

  export interface ClassAttributes<T> extends Attributes {
    ref?: any;
  }

  export interface AriaAttributes {
    [key: string]: any;
  }

  export type PropsWithChildren<P = any> = P & { children?: ReactNode };
  export type PropsWithoutRef<P = any> = P;
  export type PropsWithRef<P = any> = P;

  export type ComponentProps<T> = any;
  export type ComponentPropsWithRef<T> = any;
  export type ComponentPropsWithoutRef<T> = any;

  export interface HTMLAttributes<T> extends Attributes {}
  export interface HTMLProps<T> extends Attributes {}
  export interface ThHTMLAttributes<T> extends Attributes {}
  export interface TdHTMLAttributes<T> extends Attributes {}
  export interface TextareaHTMLAttributes<T> extends Attributes {}
  export interface SVGAttributes<T> extends Attributes {}
  export interface SVGProps<T> extends Attributes {}
  export interface CanvasHTMLAttributes<T> extends Attributes {}
  export interface FormHTMLAttributes<T> extends Attributes {}
  export interface AnchorHTMLAttributes<T> extends Attributes {}
  export type HTMLAttributeAnchorTarget = any;
  export type DetailedHTMLProps<E, T> = any;

  export interface CSSProperties {
    [key: string]: string | number | undefined;
  }

  export type MouseEvent<T = any, E = any> = any;
  export type MouseEventHandler<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type KeyboardEvent<T = any, E = any> = any;
  export type PointerEvent<T = any, E = any> = any;
  export type TouchEvent<T = any, E = any> = any;
  export type Touch = any;
  export type AnimationEvent<T = any> = any;
  export type ClipboardEvent<T = any> = any;
  export type CompositionEvent<T = any> = any;
  export type DragEvent<T = any> = any;
  export type FocusEvent<T = any> = any;
  export type FormEvent<T = any> = any;
  export type FormEventHandler<T = any> = any;
  export type SyntheticEvent<T = any> = any;
  export type TransitionEvent<T = any> = any;
  export type UIEvent<T = any> = any;
  export type WheelEvent<T = any> = any;

  export interface Context<T = any> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
  }

  export type Provider<T = any> = any;
  export type Consumer<T = any> = any;

  export type EffectCallback = () => void | (() => void);

  export function useEffect(effect: EffectCallback, deps?: DependencyList): void;

  export const Fragment: any;
  export const Suspense: any;
  export const StrictMode: any;
  export function createContext<T = any>(defaultValue?: T): Context<T>;
  export function useContext<T = any>(context: Context<T>): T;
  export function useState<S = any>(initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: DependencyList): T;
  export function useMemo<T>(factory: () => T, deps?: DependencyList): T;
  export function useRef<T = any>(initialValue?: T): MutableRefObject<T>;
  export function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
  export function forwardRef<T = any, P = any>(render: any): any;
  export function useId(): string;
  export function createElement(...args: any[]): any;

  export class Component<P = any, S = any> {
    constructor(props: P);
    setState(state: S): void;
    render(): any;
  }

  export namespace JSX {
    interface Element {
      [key: string]: any;
    }

    interface IntrinsicElements {
      [elemName: string]: any;
      mesh?: any;
      planeGeometry?: any;
      shaderMaterial?: any;
    }

    type LibraryManagedAttributes<C, P> = P;
  }
}
