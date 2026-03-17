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
      className={cn(
        "h-10 rounded-xl border border-primary/30 bg-primary px-4 text-sm font-bold text-primary-foreground",
        "shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-primary/30",
        "focus-visible:ring-2 focus-visible:ring-primary/35",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/35 border-t-primary-foreground" /> : <Icon className="h-4 w-4" />}
      <span>{children || label}</span>
    </Button>
  );
};

export default AddActionButton;
