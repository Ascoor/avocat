import React from 'react';

/**
 * IconButton — Consistent button with icon + label and premium hover effect.
 *
 * Usage:
 *   <IconButton variant="primary" onClick={fn}>
 *     <AppIcon name="gavel" size={16} /> Add Session
 *   </IconButton>
 */

const VARIANT_CLASSES = {
  primary:
    'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25',
  outline:
    'border border-border bg-card text-foreground hover:bg-secondary hover:shadow-md',
  danger:
    'bg-destructive text-destructive-foreground hover:shadow-lg hover:shadow-destructive/25',
};

const IconButton = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
