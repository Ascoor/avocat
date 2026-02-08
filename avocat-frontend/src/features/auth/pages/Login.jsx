import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";

import AuthLayout from "@shared/layout/AuthLayout";
import LanguageToggle from "@shared/ui/language-toggle";
import ThemeToggle from "@shared/ui/theme-toggle";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import { Checkbox } from "@shared/ui/checkbox";
import { useAuth } from "@shared/contexts/AuthContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { toast } from "@shared/hooks/use-toast";
import { cn } from "@shared/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mirrored, setMirrored] = useState(false);
  const [formError, setFormError] = useState(null);

  const { login, isAuthenticated, isInitializing } = useAuth();
  const { t, isRTL } = useLanguage();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      const nextUrl = searchParams.get("next") || "/dashboard";
      navigate(nextUrl, { replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate, searchParams]);

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      toast({
        title: t("common.success"),
        description: t("auth.login.after_register"),
      });
    }
    if (searchParams.get("session") === "expired") {
      toast({
        title: t("common.info"),
        description: t("auth.session_expired"),
      });
    }
  }, [searchParams, t]);

  const heroCopy = useMemo(() => t("auth.login.hero"), [t]);

  const shouldReverse = useMemo(() => mirrored, [mirrored]);

  const heroHighlights = useMemo(() => {
    if (!heroCopy?.highlights) return [];
    return heroCopy.highlights.map(({ icon, text }, idx) => {
      const Icon = icon === "shield" ? ShieldCheck : icon === "users" ? Users : CheckCircle;
      return {
        icon: <Icon key={`hi-icon-${idx}`} className="h-5 w-5" />,
        text,
      };
    });
  }, [heroCopy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password.trim()) {
      setFormError(t("auth.validation.required"));
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        throw new Error(t("auth.login.error"));
      }

      toast({
        title: t("auth.login.success_title") || t("common.success"),
        description: t("auth.login.success"),
      });

      const nextUrl = searchParams.get("next") || "/dashboard";
      navigate(nextUrl, { replace: true });
    } catch (error) {
      const message = error?.message || t("auth.login.error");
      setFormError(message);
      toast({
        title: t("common.error"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toolbar = (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="hidden text-xs sm:flex"
        onClick={() => setMirrored((prev) => !prev)}
        aria-pressed={mirrored}
        aria-label={t("auth.login.swap_layout_aria")}
      >
        <ArrowLeftRight className="h-4 w-4" />
        <span className="ms-1">{t("auth.login.swap_layout")}</span>
      </Button>

      <ThemeToggle tone="light" />
      <LanguageToggle />
    </>
  );

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <AuthLayout
      heroSide={shouldReverse ? "left" : "right"}
      toolbar={toolbar}
      hero={{
        badge: heroCopy?.badge ? (
          <>
            <Sparkles className="h-4 w-4" />
            <span>{heroCopy.badge}</span>
          </>
        ) : null,
        title: heroCopy?.headline,
        description: heroCopy?.subheadline,
        highlights: heroHighlights,
        stats: heroCopy?.stats,
      }}
      card={{
        icon: (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--color-primary))]/10">
            <UserCheck className="h-6 w-6 text-[hsl(var(--color-primary))]" />
          </div>
        ),
        title: t("auth.login.title"),
        description: t("auth.login.subtitle"),
        content: (
          <div className="space-y-5">
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-[hsl(var(--color-danger))]/30 bg-[hsl(var(--color-danger))]/10 px-3 py-2 text-sm text-[hsl(var(--color-danger))]"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{formError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t("auth.login.email")}
                </Label>

                <div className="relative">
                  <Mail className="absolute top-1/2 start-3 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.login.email_placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 ps-10"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t("auth.login.password")}
                  </Label>

                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    {t("auth.login.forgot_password")}
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute top-1/2 start-3 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.login.password_placeholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 ps-10 pe-12"
                    required
                    autoComplete="current-password"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 h-8 w-8",
                      "end-1",
                    )}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? t("auth.login.hide_password") : t("auth.login.show_password")}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
                <Label htmlFor="remember" className="cursor-pointer text-sm text-muted-foreground">
                  {t("auth.login.remember")}
                </Label>
              </div>

              <Button type="submit" className="h-11 w-full font-semibold" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    {t("common.loading")}
                  </span>
                ) : (
                  <>
                    {t("auth.login.submit")}
                    <ArrowRight className={cn("ms-2 h-4 w-4", isRTL && "rotate-180 me-2 ms-0")} />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[hsl(var(--color-surface))] px-2 text-muted-foreground">{t("common.or")}</span>
              </div>
            </div>

            <div className="space-y-3 text-center text-sm">
              <p className="text-muted-foreground">
                {t("auth.login.no_account")} {" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  {t("auth.signup.submit")}
                </Link>
              </p>

              <p>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  {isRTL ? `← ${t("common.backToHome")}` : `← ${t("common.backToHome")}`}
                </Link>
              </p>
            </div>

            <div
              className={cn(
                "mt-4 flex items-center gap-3 rounded-xl border border-dashed border-[hsl(var(--color-primary))]/30 bg-[hsl(var(--color-primary))]/5 p-3 text-start",
                isRTL ? "flex-row-reverse" : "",
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--color-primary))]/10">
                <ShieldCheck className="h-5 w-5 text-[hsl(var(--color-primary))]" />
              </div>

              <div className="space-y-0.5 text-xs">
                <p className="font-semibold text-foreground">{t("auth.security.title")}</p>
                <p className="text-muted-foreground">{t("auth.security.subtitle")}</p>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default Login;
