import { useTheme } from "@shared/contexts/ThemeContext";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[hsl(var(--color-surface))] group-[.toaster]:text-[hsl(var(--color-text))] group-[.toaster]:border-[hsl(var(--color-border))] group-[.toaster]:shadow-card",
          description: "group-[.toast]:text-[hsl(var(--color-muted))]",
          actionButton:
            "group-[.toast]:bg-[hsl(var(--color-primary))] group-[.toast]:text-[hsl(var(--color-primary-fg))]",
          cancelButton:
            "group-[.toast]:bg-[hsl(var(--color-surface-2))] group-[.toast]:text-[hsl(var(--color-muted))]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
