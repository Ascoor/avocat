import React from "react";

type IconBaseProps = {
  size?: number;
  className?: string;
  title?: string;
  ariaLabel?: string;
};

type IconWrapperProps = IconBaseProps & {
  children: React.ReactNode;
  viewBox?: string;
};

const IconBase = ({
  size = 24,
  className,
  title,
  ariaLabel,
  children,
  viewBox = "0 0 24 24",
}: IconWrapperProps) => (
  <svg
    role="img"
    aria-hidden={ariaLabel || title ? undefined : true}
    aria-label={ariaLabel || title}
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

export const GavelIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M13 6.5 17.5 11" />
    <path d="M11 8.5 15.5 13" />
    <path d="M6.5 13.5 10.5 9.5" />
    <rect x="3.5" y="14" width="7" height="3.5" rx="1" />
    <path d="M14.5 4.5 19.5 9.5" />
  </IconBase>
);

export const ScalesIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M12 4v15" />
    <path d="M6 6h12" />
    <path d="m6 6-3 5h6z" />
    <path d="m18 6 3 5h-6z" />
    <path d="M8 21h8" />
  </IconBase>
);

export const ShieldIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.3 7.9 7.5 9 4.2-1.1 7.5-4.5 7.5-9V6Z" />
    <path d="m9.5 11 2 2 3.5-4" />
  </IconBase>
);

export const DocumentIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h8" />
    <path d="M9 17h6" />
  </IconBase>
);

export const BriefcaseIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5h6v2" />
    <path d="M3 12h18" />
  </IconBase>
);

export const UserIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="8" r="3" />
    <path d="M5 19c1.8-3 4.4-4 7-4s5.2 1 7 4" />
  </IconBase>
);

export const UsersIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <circle cx="8" cy="9" r="2.5" />
    <circle cx="16" cy="8" r="2" />
    <path d="M3.5 19c1.5-2.6 3.8-3.7 6.5-3.7" />
    <path d="M12.5 15.5c2.6 0 4.6 1.1 6 3.5" />
  </IconBase>
);

export const LockIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15" r="1.3" />
  </IconBase>
);

export const CourtIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M4 20h16" />
    <path d="M6 20V9l6-4 6 4v11" />
    <path d="M9 20v-6h6v6" />
    <path d="M4 9h16" />
  </IconBase>
);

export const CalendarIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M4 9h16" />
    <path d="M8 13h3" />
    <path d="M13 13h3" />
  </IconBase>
);

export const SearchIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="6" />
    <path d="m16.5 16.5 3.5 3.5" />
  </IconBase>
);

export const ToolIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M14.5 4a4.5 4.5 0 0 0 4.3 6.1l-8.9 8.9a2 2 0 0 1-2.8-2.8l8.9-8.9A4.5 4.5 0 0 0 14.5 4Z" />
    <path d="m6 18 2-2" />
  </IconBase>
);

export const ViewIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </IconBase>
);

export const EditIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5Z" />
    <path d="m12.5 7 3.5 3.5" />
  </IconBase>
);

export const TrashIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M4 7h16" />
    <path d="M9 7V5h6v2" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </IconBase>
);

export const SortUpIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M7 17V7" />
    <path d="m7 7-3 3" />
    <path d="m7 7 3 3" />
    <path d="M13 17h6" />
    <path d="M13 13h4.5" />
    <path d="M13 9h3" />
  </IconBase>
);

export const SortDownIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M7 7v10" />
    <path d="m7 17-3-3" />
    <path d="m7 17 3-3" />
    <path d="M13 7h6" />
    <path d="M13 11h4.5" />
    <path d="M13 15h3" />
  </IconBase>
);

export const ClientIcon = (props: IconBaseProps) => (
  
    <IconBase {...props}>
      {/* بسيطة: شكل user + badge */}
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 20c1.5-3 4.5-5 8-5s6.5 2 8 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.5 8.5h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
        </IconBase>
  
);
export const ArrowForwardIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M5 12h13" />
    <path d="m13 7 5 5-5 5" />
  </IconBase>
);
