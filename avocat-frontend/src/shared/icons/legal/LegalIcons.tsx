import type { ReactNode, SVGProps } from "react";

type LegalIconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

const withDefaults = ({ width, height, ...rest }: LegalIconProps) => ({
  width: width ?? 32,
  height: height ?? 32,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...rest,
});

const IconFrame = ({ title, children, ...props }: LegalIconProps & { children: ReactNode }) => {
  const svgProps = withDefaults(props);
  return (
    <svg viewBox="0 0 128 128" role="img" aria-hidden={title ? undefined : true} {...svgProps}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="legal-gold" x1="18" y1="18" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2C2" />
          <stop offset="45%" stopColor="#E2B56A" />
          <stop offset="100%" stopColor="#A86A2B" />
        </linearGradient>
        <linearGradient id="legal-navy" x1="16" y1="12" x2="116" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#17324A" />
          <stop offset="100%" stopColor="#071521" />
        </linearGradient>
        <linearGradient id="legal-ivory" x1="24" y1="18" x2="104" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="100%" stopColor="#D8C7A2" />
        </linearGradient>
        <filter id="legal-shadow" x="-25%" y="-25%" width="170%" height="180%">
          <feOffset dy="7" in="SourceAlpha" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="7" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.03 0 0 0 0 0.10 0 0 0 0 0.18 0 0 0 0.30 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#legal-shadow)" stroke="url(#legal-gold)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
};

export const CourthouseIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M24 46 64 24l40 22H24Z" fill="url(#legal-navy)" />
    <path d="M32 100h64" />
    <path d="M38 46v54M56 46v54M72 46v54M90 46v54" />
    <path d="M26 108h76" />
  </IconFrame>
);

export const GavelIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <rect x="34" y="30" width="18" height="36" rx="5" transform="rotate(-35 34 30)" fill="url(#legal-ivory)" />
    <rect x="49" y="22" width="18" height="36" rx="5" transform="rotate(-35 49 22)" fill="url(#legal-ivory)" />
    <path d="m58 59 36 26" />
    <path d="M28 100h52" />
    <path d="M36 90h36" />
  </IconFrame>
);

export const ScaleIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M64 24v74" />
    <path d="M38 42h52" />
    <path d="M46 42 30 66M82 42l16 24" />
    <path d="M26 66h24l-5 14H31l-5-14ZM78 66h24l-5 14H83l-5-14Z" fill="url(#legal-navy)" />
    <path d="M48 108h32" />
  </IconFrame>
);

export const BriefcaseIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <rect x="22" y="40" width="84" height="52" rx="12" fill="url(#legal-navy)" />
    <path d="M48 40v-8c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v8" />
    <path d="M22 62h84" />
    <rect x="56" y="58" width="16" height="16" rx="3" fill="url(#legal-ivory)" />
  </IconFrame>
);

export const LegalDocumentIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M34 18h38l22 22v68H34z" fill="url(#legal-ivory)" />
    <path d="M72 18v22h22" />
    <path d="M46 56h36M46 70h30M46 84h24" />
    <path d="m68 92 16-16 10 10-16 16H68v-10Z" fill="url(#legal-navy)" />
  </IconFrame>
);

export const StampSealIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <circle cx="64" cy="70" r="28" fill="url(#legal-navy)" />
    <circle cx="64" cy="70" r="16" fill="url(#legal-ivory)" />
    <path d="M52 36c3-10 8-16 12-16s9 6 12 16" />
    <path d="M58 68h12M64 62v12" />
  </IconFrame>
);

export const WalletIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M28 42h58c9 0 14 5 14 14v30c0 7-5 12-12 12H28c-7 0-12-5-12-12V54c0-7 5-12 12-12Z" fill="url(#legal-navy)" />
    <path d="M28 42 84 28" />
    <path d="M78 58h26v20H78c-6 0-10-4-10-10s4-10 10-10Z" fill="url(#legal-ivory)" />
    <circle cx="88" cy="68" r="3" fill="url(#legal-gold)" stroke="none" />
  </IconFrame>
);

export const FolderIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M22 42h24l8 10h52v40c0 7-5 12-12 12H22z" fill="url(#legal-navy)" />
    <path d="M22 42v-4c0-6 4-10 10-10h18l8 10" />
    <path d="M22 58h84" />
  </IconFrame>
);

export const CalendarIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <rect x="24" y="28" width="80" height="76" rx="12" fill="url(#legal-ivory)" />
    <path d="M24 48h80" />
    <path d="M42 20v16M86 20v16" />
    <path d="M42 64h16v16H42zM70 64h16v16H70z" fill="url(#legal-navy)" />
  </IconFrame>
);

export const ArchiveIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <rect x="24" y="28" width="80" height="22" rx="8" fill="url(#legal-navy)" />
    <path d="M32 50h64v46c0 7-5 12-12 12H44c-7 0-12-5-12-12V50Z" fill="url(#legal-ivory)" />
    <path d="M50 74h28" />
    <path d="M54 50h20" />
  </IconFrame>
);

export const SearchFileIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M30 22h40l18 18v50H30z" fill="url(#legal-ivory)" />
    <path d="M70 22v18h18" />
    <circle cx="66" cy="74" r="16" fill="url(#legal-navy)" />
    <path d="m78 86 16 16" />
  </IconFrame>
);

export const BuildingOfficeIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <rect x="30" y="24" width="68" height="82" rx="10" fill="url(#legal-navy)" />
    <path d="M44 42h8M60 42h8M76 42h8M44 58h8M60 58h8M76 58h8M44 74h8M60 74h8M76 74h8" />
    <path d="M56 106V84h16v22" />
  </IconFrame>
);

export const ShieldIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M64 18 28 32v30c0 24 14 40 36 48 22-8 36-24 36-48V32L64 18Z" fill="url(#legal-navy)" />
    <path d="M64 46v28" />
    <path d="M52 58h24" />
    <path d="M56 84h16" />
  </IconFrame>
);

export const UsersIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <circle cx="48" cy="44" r="12" fill="url(#legal-ivory)" />
    <circle cx="80" cy="48" r="10" fill="url(#legal-ivory)" />
    <path d="M30 92c0-13 10-24 24-24s24 11 24 24" />
    <path d="M70 92c1-10 8-18 18-20 8 4 12 10 14 20" />
  </IconFrame>
);

export const BooksIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <rect x="28" y="30" width="16" height="66" rx="5" fill="url(#legal-navy)" />
    <rect x="48" y="24" width="20" height="72" rx="5" fill="url(#legal-ivory)" />
    <rect x="72" y="34" width="22" height="62" rx="5" fill="url(#legal-navy)" />
    <path d="M34 44h6M54 40h8M78 50h10" />
  </IconFrame>
);

export const BarChartIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M26 102h76" />
    <rect x="34" y="66" width="14" height="36" rx="4" fill="url(#legal-ivory)" />
    <rect x="58" y="50" width="14" height="52" rx="4" fill="url(#legal-navy)" />
    <rect x="82" y="36" width="14" height="66" rx="4" fill="url(#legal-ivory)" />
  </IconFrame>
);

export const BellIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M40 86h48l-6-10V58c0-12-8-22-18-26v-4h-4v4c-10 4-18 14-18 26v18l-6 10Z" fill="url(#legal-ivory)" />
    <path d="M54 94c1 8 5 12 10 12s9-4 10-12" />
  </IconFrame>
);

export const DatabaseIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <ellipse cx="64" cy="32" rx="28" ry="12" fill="url(#legal-ivory)" />
    <path d="M36 32v40c0 6 12 12 28 12s28-6 28-12V32" />
    <path d="M36 52c0 6 12 12 28 12s28-6 28-12M36 72c0 6 12 12 28 12s28-6 28-12" />
  </IconFrame>
);

export const BookOpenIcon = (props: LegalIconProps) => (
  <IconFrame {...props}>
    <path d="M24 34c18-8 34-8 40 0v58c-6-8-22-8-40 0V34Z" fill="url(#legal-ivory)" />
    <path d="M104 34c-18-8-34-8-40 0v58c6-8 22-8 40 0V34Z" fill="url(#legal-navy)" />
    <path d="M64 34v58" />
  </IconFrame>
);

export const LegalIcons = {
  ArchiveIcon,
  BarChartIcon,
  BellIcon,
  BookOpenIcon,
  BooksIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CourthouseIcon,
  DatabaseIcon,
  FolderIcon,
  GavelIcon,
  LegalDocumentIcon,
  ScaleIcon,
  SearchFileIcon,
  ShieldIcon,
  StampSealIcon,
  UsersIcon,
  WalletIcon,
};

export type { LegalIconProps };
export default LegalIcons;
