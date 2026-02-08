# Pre-UI Gate Failure (master)

## Command Logs

### npm run build
```
(vite build) completed successfully.
```

### npx tsc --noEmit
```
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(687,52): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(1233,52): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(1238,69): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(1241,60): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(1247,263): error TS2694: Namespace 'React' has no exported member 'ReactFragment'.
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(1249,189): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/@react-spring/core/dist/react-spring_core.modern.d.ts(1311,69): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/@react-spring/web/dist/react-spring_web.modern.d.ts(11,44): error TS2344: Type 'Tag' does not satisfy the constraint 'ElementType'.
  Type 'string | number' is not assignable to type 'ElementType'.
    Type 'string' is not assignable to type 'ElementType'.
      Type 'Tag' is not assignable to type 'FunctionComponent<any>'.
        Type 'string | number' is not assignable to type 'FunctionComponent<any>'.
          Type 'string' is not assignable to type 'FunctionComponent<any>'.
node_modules/react-icons/lib/iconBase.d.ts(19,9): error TS2694: Namespace 'global.JSX' has no exported member 'Element'.
node_modules/vite/client.d.ts(63,18): error TS2300: Duplicate identifier 'src'.
node_modules/vite/client.d.ts(67,18): error TS2300: Duplicate identifier 'src'.
node_modules/vite/client.d.ts(71,18): error TS2300: Duplicate identifier 'src'.
node_modules/vite/client.d.ts(91,18): error TS2300: Duplicate identifier 'src'.
node_modules/vite/client.d.ts(99,18): error TS2300: Duplicate identifier 'src'.
src/shared/hooks/useClients.ts(1,55): error TS2307: Cannot find module '@tanstack/react-query' or its corresponding type declarations.
src/shared/hooks/useLegalCases.tsx(1,55): error TS2307: Cannot find module '@tanstack/react-query' or its corresponding type declarations.
src/shared/hooks/useLegalCases.tsx(31,23): error TS2339: Property 'leg_case' does not exist on type '{ leg_case: LegalCase; } | { data: { leg_case: LegalCase; }; }'.
  Property 'leg_case' does not exist on type '{ data: { leg_case: LegalCase; }; }'.
src/shared/hooks/usePageManager.ts(2,55): error TS2307: Cannot find module '@tanstack/react-query' or its corresponding type declarations.
src/shared/hooks/useUserRoles.ts(2,26): error TS2307: Cannot find module '@tanstack/react-query' or its corresponding type declarations.
src/shared/hooks/useWebsiteContent.ts(2,26): error TS2307: Cannot find module '@tanstack/react-query' or its corresponding type declarations.
src/shared/hooks/useWorkflowManager.ts(2,55): error TS2307: Cannot find module '@tanstack/react-query' or its corresponding type declarations.
src/shared/ui/Silk.tsx(3,55): error TS2307: Cannot find module '@react-three/fiber' or its corresponding type declarations.
src/shared/ui/Silk.tsx(4,45): error TS2307: Cannot find module 'three' or its corresponding type declarations.
src/shared/ui/Silk.tsx(5,26): error TS2307: Cannot find module 'three' or its corresponding type declarations.
src/shared/ui/Silk.tsx(113,5): error TS2339: Property 'mesh' does not exist on type 'JSX.IntrinsicElements'.
src/shared/ui/Silk.tsx(114,7): error TS2339: Property 'planeGeometry' does not exist on type 'JSX.IntrinsicElements'.
src/shared/ui/Silk.tsx(115,7): error TS2339: Property 'shaderMaterial' does not exist on type 'JSX.IntrinsicElements'.
src/shared/ui/Silk.tsx(116,5): error TS2339: Property 'mesh' does not exist on type 'JSX.IntrinsicElements'.
src/shared/ui/calendar.tsx(3,27): error TS2307: Cannot find module 'react-day-picker' or its corresponding type declarations.
src/shared/ui/carousel.tsx(2,61): error TS2307: Cannot find module 'embla-carousel-react' or its corresponding type declarations.
src/shared/ui/carousel.tsx(169,6): error TS2339: Property 'className' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/carousel.tsx(169,17): error TS2339: Property 'variant' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/carousel.tsx(169,38): error TS2339: Property 'size' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/carousel.tsx(173,8): error TS2322: Type '{ children: Element[]; key?: Key; ref: ForwardedRef<HTMLButtonElement>; variant: any; size: any; className: string; disabled: boolean; onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & RefAttributes<any>'.
  Property 'children' does not exist on type 'IntrinsicAttributes & RefAttributes<any>'.
src/shared/ui/carousel.tsx(197,6): error TS2339: Property 'className' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/carousel.tsx(197,17): error TS2339: Property 'variant' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/carousel.tsx(197,38): error TS2339: Property 'size' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/carousel.tsx(201,8): error TS2322: Type '{ children: Element[]; key?: Key; ref: ForwardedRef<HTMLButtonElement>; variant: any; size: any; className: string; disabled: boolean; onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & RefAttributes<any>'.
  Property 'children' does not exist on type 'IntrinsicAttributes & RefAttributes<any>'.
src/shared/ui/command.tsx(3,45): error TS2307: Cannot find module 'cmdk' or its corresponding type declarations.
src/shared/ui/drawer.tsx(2,43): error TS2307: Cannot find module 'vaul' or its corresponding type declarations.
src/shared/ui/form.tsx(4,99): error TS2307: Cannot find module 'react-hook-form' or its corresponding type declarations.
src/shared/ui/form.tsx(81,27): error TS2322: Type '{ key?: Key; id?: string; color?: string; content?: string; translate?: "yes" | "no"; hidden?: boolean; form?: string; slot?: string; style?: CSSProperties; title?: string; dir?: string; ... 271 more ...; className: string; }' is not assignable to type 'IntrinsicAttributes & RefAttributes<any>'.
  Property 'className' does not exist on type 'IntrinsicAttributes & RefAttributes<any>'.
src/shared/ui/input-otp.tsx(2,43): error TS2307: Cannot find module 'input-otp' or its corresponding type declarations.
src/shared/ui/input-otp.tsx(29,60): error TS2339: Property 'slots' does not exist on type 'unknown'.
src/shared/ui/pagination.tsx(5,10): error TS2305: Module '"@shared/ui/button"' has no exported member 'ButtonProps'.
src/shared/ui/resizable.tsx(2,37): error TS2307: Cannot find module 'react-resizable-panels' or its corresponding type declarations.
src/shared/ui/sidebar.tsx(226,6): error TS2339: Property 'className' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/sidebar.tsx(226,17): error TS2339: Property 'onClick' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/sidebar.tsx(230,8): error TS2322: Type '{ children: Element[]; key?: Key; ref: ForwardedRef<any>; "data-sidebar": string; variant: string; size: string; className: string; onClick: (event: any) => void; }' is not assignable to type 'IntrinsicAttributes & RefAttributes<any>'.
  Property 'children' does not exist on type 'IntrinsicAttributes & RefAttributes<any>'.
src/shared/ui/sidebar.tsx(294,6): error TS2339: Property 'className' does not exist on type 'Omit<RefAttributes<any>, "ref">'.
src/shared/ui/sidebar.tsx(299,9): error TS2322: Type '{ key?: Key; ref: ForwardedRef<any>; "data-sidebar": string; className: string; }' is not assignable to type 'IntrinsicAttributes & RefAttributes<any>'.
  Property 'className' does not exist on type 'IntrinsicAttributes & RefAttributes<any>'.
src/shared/ui/sonner.tsx(1,26): error TS2307: Cannot find module 'next-themes' or its corresponding type declarations.
src/shared/ui/sonner.tsx(2,42): error TS2307: Cannot find module 'sonner' or its corresponding type declarations.
src/types/vendor-stubs.d.ts(6,18): error TS2300: Duplicate identifier 'src'.
src/types/vendor-stubs.d.ts(11,18): error TS2300: Duplicate identifier 'src'.
src/types/vendor-stubs.d.ts(16,18): error TS2300: Duplicate identifier 'src'.
src/types/vendor-stubs.d.ts(21,18): error TS2300: Duplicate identifier 'src'.
src/types/vendor-stubs.d.ts(26,18): error TS2300: Duplicate identifier 'src'.
```

## Failure Reason
TypeScript compilation failed due to missing dependencies/typings (e.g. @tanstack/react-query, react-day-picker, embla-carousel-react, cmdk, vaul, react-hook-form, input-otp, react-resizable-panels, next-themes, sonner, three/@react-three/fiber) and JSX type mismatches. Additionally, duplicate identifier errors appear for `src` in both `vite/client.d.ts` and the newly added vendor stubs, indicating incompatible global typings.

## What Is Missing
- Required package typings/modules listed above are not available to TypeScript.
- The JSX global typing setup needs alignment with the project (global JSX.Element and React types expected by dependencies).
- Potentially missing or misconfigured type definitions for Vite client types and module declarations.
