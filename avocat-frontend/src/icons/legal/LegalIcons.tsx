import * as React from "react";

export type LegalIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

const defaultSize = 64;

const withDefaults = ({ width, height, ...rest }: LegalIconProps) => ({
  width: width ?? defaultSize,
  height: height ?? defaultSize,
  ...rest,
});

export const CourthouseIcon: React.FC<LegalIconProps> = (props) => {
  const svgProps = withDefaults(props);
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-hidden={props.title ? undefined : true}
      {...svgProps}
    >
      {props.title ? <title>{props.title}</title> : null}
      <defs>
        <linearGradient id="courthouse-roof" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B8BFF" />
          <stop offset="100%" stopColor="#3A61F8" />
        </linearGradient>
        <linearGradient id="courthouse-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F7F8FC" />
          <stop offset="100%" stopColor="#E4E7F5" />
        </linearGradient>
        <linearGradient id="courthouse-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9BEBD0" />
          <stop offset="100%" stopColor="#2AC797" />
        </linearGradient>
        <filter id="courthouse-shadow" x="-20%" y="-20%" width="140%" height="160%" filterUnits="objectBoundingBox">
          <feOffset dy="8" in="SourceAlpha" result="shadowOffset" />
          <feGaussianBlur stdDeviation="12" in="shadowOffset" result="shadowBlur" />
          <feColorMatrix in="shadowBlur" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#courthouse-shadow)">
        <ellipse cx="64" cy="108" rx="48" ry="10" fill="rgba(19,32,67,0.12)" />
        <path
          d="M32 94h64v12a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V94Z"
          fill="url(#courthouse-body)"
        />
        <path
          d="M28 86h72v10H28z"
          fill="#D5DAF0"
        />
        <path
          d="M28 84c3-4 17-18 36-18s33 14 36 18H28Z"
          fill="url(#courthouse-roof)"
        />
        <path
          d="M24 56 64 32l40 24v6H24v-6Z"
          fill="url(#courthouse-roof)"
        />
        <rect x="30" y="62" width="12" height="36" rx="4" fill="url(#courthouse-body)" />
        <rect x="78" y="62" width="12" height="36" rx="4" fill="url(#courthouse-body)" />
        <rect x="54" y="62" width="12" height="36" rx="4" fill="url(#courthouse-body)" />
        <circle cx="64" cy="44" r="6" fill="url(#courthouse-light)" />
        <path
          d="M64 50c-2.8 0-5 2.24-5 5h10c0-2.76-2.2-5-5-5Z"
          fill="#2AC797"
          opacity="0.6"
        />
      </g>
    </svg>
  );
};

export const GavelIcon: React.FC<LegalIconProps> = (props) => {
  const svgProps = withDefaults(props);
  return (
    <svg viewBox="0 0 128 128" role="img" aria-hidden={props.title ? undefined : true} {...svgProps}>
      {props.title ? <title>{props.title}</title> : null}
      <defs>
        <linearGradient id="gavel-head" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB37A" />
          <stop offset="100%" stopColor="#FF7B4D" />
        </linearGradient>
        <linearGradient id="gavel-handle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B8BFF" />
          <stop offset="100%" stopColor="#3A61F8" />
        </linearGradient>
        <filter id="gavel-shadow" x="-20%" y="-20%" width="160%" height="170%" filterUnits="objectBoundingBox">
          <feOffset dy="8" in="SourceAlpha" result="shadowOffset" />
          <feGaussianBlur stdDeviation="14" in="shadowOffset" result="shadowBlur" />
          <feColorMatrix in="shadowBlur" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#gavel-shadow)">
        <ellipse cx="64" cy="108" rx="44" ry="10" fill="rgba(19,32,67,0.14)" />
        <rect x="36" y="86" width="56" height="14" rx="7" fill="#E4E7F5" />
        <rect x="42" y="76" width="44" height="12" rx="6" fill="#CED3EA" />
        <rect x="54" y="28" width="18" height="46" rx="9" transform="rotate(-30 54 28)" fill="url(#gavel-head)" />
        <rect x="40" y="34" width="18" height="46" rx="9" transform="rotate(-30 40 34)" fill="url(#gavel-head)" />
        <rect x="60" y="54" width="52" height="10" rx="5" transform="rotate(-30 60 54)" fill="url(#gavel-handle)" />
        <circle cx="101" cy="31" r="6" fill="#F4F6FB" />
      </g>
    </svg>
  );
};

export const LegalDocumentIcon: React.FC<LegalIconProps> = (props) => {
  const svgProps = withDefaults(props);
  return (
    <svg viewBox="0 0 128 128" role="img" aria-hidden={props.title ? undefined : true} {...svgProps}>
      {props.title ? <title>{props.title}</title> : null}
      <defs>
        <linearGradient id="doc-paper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E9ECF7" />
        </linearGradient>
        <linearGradient id="doc-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B8BFF" />
          <stop offset="100%" stopColor="#3A61F8" />
        </linearGradient>
        <linearGradient id="pencil-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB37A" />
          <stop offset="100%" stopColor="#FF7B4D" />
        </linearGradient>
        <filter id="doc-shadow" x="-20%" y="-20%" width="160%" height="170%">
          <feOffset dy="8" in="SourceAlpha" result="shadowOffset" />
          <feGaussianBlur stdDeviation="14" in="shadowOffset" result="shadowBlur" />
          <feColorMatrix in="shadowBlur" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#doc-shadow)">
        <ellipse cx="64" cy="110" rx="44" ry="10" fill="rgba(19,32,67,0.12)" />
        <path
          d="M32 24h44l20 20v58a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V24Z"
          fill="url(#doc-paper)"
        />
        <path d="M76 24v16a4 4 0 0 0 4 4h16" fill="#CED3EA" />
        <rect x="44" y="54" width="40" height="6" rx="3" fill="#CED3EA" />
        <rect x="44" y="68" width="28" height="6" rx="3" fill="#CED3EA" />
        <rect x="44" y="82" width="32" height="6" rx="3" fill="#CED3EA" />
        <circle cx="92" cy="78" r="12" fill="url(#doc-accent)" />
        <path
          d="M92 68c-3.3 0-6 2.7-6 6 0 3.17 2.48 5.76 5.6 5.98V86h1.8v-6.02c3.12-.22 5.6-2.8 5.6-5.98 0-3.3-2.7-6-6-6Zm0 3.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z"
          fill="#FFFFFF"
        />
        <path
          d="m40 96 36 16 4-8-36-16-4 8Z"
          fill="url(#pencil-body)"
        />
        <path
          d="m76 104 4-8 6 6-4 8-6-6Z"
          fill="#313A5A"
        />
        <path d="m40 96-2 10 10-2 36 16-4-4-40-20Z" fill="#FFE3CC" opacity="0.8" />
      </g>
    </svg>
  );
};

export const ShieldIcon: React.FC<LegalIconProps> = (props) => {
  const svgProps = withDefaults(props);
  return (
    <svg viewBox="0 0 128 128" role="img" aria-hidden={props.title ? undefined : true} {...svgProps}>
      {props.title ? <title>{props.title}</title> : null}
      <defs>
        <linearGradient id="shield-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B8BFF" />
          <stop offset="100%" stopColor="#3A61F8" />
        </linearGradient>
        <linearGradient id="shield-core" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB37A" />
          <stop offset="100%" stopColor="#FF7B4D" />
        </linearGradient>
        <filter id="shield-shadow" x="-20%" y="-20%" width="160%" height="170%">
          <feOffset dy="8" in="SourceAlpha" result="shadowOffset" />
          <feGaussianBlur stdDeviation="14" in="shadowOffset" result="shadowBlur" />
          <feColorMatrix in="shadowBlur" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#shield-shadow)">
        <ellipse cx="64" cy="110" rx="42" ry="10" fill="rgba(19,32,67,0.14)" />
        <path
          d="M64 18 28 30v36c0 27.3 16.5 46 36 52 19.5-6 36-24.7 36-52V30L64 18Z"
          fill="url(#shield-body)"
        />
        <path
          d="M64 32 40 40v26c0 19 11.5 32.2 24 37 12.5-4.8 24-18 24-37V40L64 32Z"
          fill="url(#shield-core)"
        />
        <path
          d="M64 46c-3.3 0-6 2.7-6 6 0 2.86 2 5.26 4.7 5.86L60 76h8l-2.7-18.14c2.7-.6 4.7-3 4.7-5.86 0-3.3-2.7-6-6-6Z"
          fill="#FFFFFF"
        />
        <path d="M56 78h16v10H56z" fill="#F4F6FB" opacity="0.7" />
      </g>
    </svg>
  );
};

export const LegalIcons = {
  CourthouseIcon,
  GavelIcon,
  LegalDocumentIcon,
  ShieldIcon,
};

export default LegalIcons;
