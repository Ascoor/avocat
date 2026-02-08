// Placeholder module stubs for vendor packages that may be missing typings.
// Add specific module declarations here as needed.

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '@tanstack/react-query' {
  export interface QueryClient {
    getQueryData<TData = any>(...args: any[]): TData | undefined;
    setQueryData<TData = any>(...args: any[]): void;
    invalidateQueries(...args: any[]): void;
    cancelQueries(...args: any[]): void;
  }
  export function useQuery<TData = any, TError = any, TQueryKey = any>(...args: any[]): any;
  export function useMutation<TData = any, TError = any, TVariables = any, TContext = any>(...args: any[]): any;
  export function useQueryClient<TClient = QueryClient>(...args: any[]): TClient;
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
  export type RootState = any;
}

declare module 'three' {
  export class Color {
    constructor(...args: any[]);
  }
  export class Mesh {
    material: any;
    scale: any;
  }
  export class ShaderMaterial {
    uniforms: any;
  }
  export type IUniform = any;
}

declare module 'react-day-picker' {
  export const DayPicker: any;
}

declare module 'embla-carousel-react' {
  export type UseEmblaCarouselType = [any, any];
  const useEmblaCarousel: (...args: any[]) => UseEmblaCarouselType;
  export default useEmblaCarousel;
}

declare module 'cmdk' {
  export const Command: any;
}

declare module 'vaul' {
  export const Drawer: any;
}

declare module 'react-hook-form' {
  export const Controller: any;
  export type ControllerProps<TFieldValues = any, TName = any> = any;
  export type FieldPath<TFieldValues = any> = any;
  export type FieldValues = any;
  export const FormProvider: any;
  export const useFormContext: any;
}

declare module 'input-otp' {
  export const OTPInput: any;
  export const OTPInputContext: import('react').Context<any>;
}

declare module 'react-resizable-panels' {
  export const PanelGroup: any;
  export const Panel: any;
  export const PanelResizeHandle: any;
}

declare module 'next-themes' {
  export const useTheme: any;
}

declare module 'sonner' {
  export const Toaster: any;
  export const toast: any;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '@shared/ui/button' {
  export type ButtonProps = any;
  export const buttonVariants: any;
  export const Button: any;
}

declare module '@shared/ui/input' {
  export const Input: any;
}
