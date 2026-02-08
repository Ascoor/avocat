declare module '@tanstack/react-query' {
  export const QueryClient: any;
  export const QueryClientProvider: any;

  export interface UseQueryResult<TData = any> {
    data?: TData;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: any;
  }

  export interface UseMutationResult<TData = any> {
    data?: TData;
    mutate: (...args: any[]) => void;
    mutateAsync: (...args: any[]) => Promise<TData>;
    isPending: boolean;
    isError: boolean;
    error: any;
  }

  export function useQuery<TData = any, TError = any>(...args: any[]): UseQueryResult<TData>;
  export function useMutation<TData = any, TError = any, TVariables = any, TContext = any>(
    ...args: any[]
  ): UseMutationResult<TData>;
  export function useQueryClient(): {
    getQueryData: <TData = any>(...args: any[]) => TData | undefined;
    setQueryData: (...args: any[]) => void;
    invalidateQueries: (...args: any[]) => void;
    cancelQueries: (...args: any[]) => Promise<void>;
  };
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
  export type RootState = any;
}

declare module 'three' {
  export type Color = any;
  export type Mesh = any;
  export type ShaderMaterial = any;
  export type IUniform = any;
  export const Color: any;
  export const Mesh: any;
  export const ShaderMaterial: any;
  const THREE: any;
  export default THREE;
}

declare module 'react-day-picker' {
  export const DayPicker: any;
  export type DayPickerProps = any;
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
  export const useForm: any;
  export const Controller: any;
  export type ControllerProps<TFieldValues = any, TName = any> = any;
  export type FieldPath<TFieldValues = any> = any;
  export type FieldValues = any;
  export const FormProvider: any;
  export const useFormContext: any;
}

declare module 'input-otp' {
  export const InputOTP: any;
  export const OTPInput: any;
  export const OTPInputContext: any;
}

declare module 'react-resizable-panels' {
  export const PanelGroup: any;
  export const Panel: any;
  export const PanelResizeHandle: any;
}

declare module 'next-themes' {
  export const ThemeProvider: any;
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
