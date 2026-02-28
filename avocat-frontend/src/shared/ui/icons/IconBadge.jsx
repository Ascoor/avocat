import React from 'react';

/**
 * IconBadge — Premium 3D-embossed icon wrapper.
 *
 * Usage:
 *   <IconBadge tone="primary" size="lg">
 *     <AppIcon name="scales" />
 *   </IconBadge>
 *
 * Sizes: sm (32px), md (40px), lg (48px)
 * Tones: primary, muted, danger, success, warning
 */

const SIZE_MAP = {
  sm: 'h-8 w-8 rounded-xl',
  md: 'h-10 w-10 rounded-xl',
  lg: 'h-12 w-12 rounded-2xl',
};

const TONE_MAP = {
  primary: 'icon-badge-primary',
  muted: 'icon-badge-muted',
  danger: 'icon-badge-danger',
  success: 'icon-badge-success',
  warning: 'icon-badge-warning',
};

const IconBadge = ({ children, tone = 'primary', size = 'md', className = '' }) => {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const toneClass = TONE_MAP[tone] || TONE_MAP.primary;

  return (
    <span
      className={`icon-badge-premium ${toneClass} ${sizeClass} inline-flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="icon-badge-inner" />
      {children}
    </span>
  );
};

export default IconBadge;
