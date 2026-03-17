import React, { forwardRef } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { cn } from '@shared/lib/utils';

const AppNavLink = forwardRef(({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive, isPending }) =>
        cn(className, isActive && activeClassName, isPending && pendingClassName)
      }
      {...props}
    />
  );
});

AppNavLink.displayName = "AppNavLink";

export { AppNavLink };
