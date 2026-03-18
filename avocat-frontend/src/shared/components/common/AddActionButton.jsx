import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";

const AddActionButton = ({
  label = "إضافة جديدة",
  icon,
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const Icon = icon || Plus;

  return (
    <Button
      type="button"
      variant="default"
      className={cn("min-w-[9.5rem] rounded-2xl px-4", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      <span>{children || label}</span>
    </Button>
  );
};

export default AddActionButton;
