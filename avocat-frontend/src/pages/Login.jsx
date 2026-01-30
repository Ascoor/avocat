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

import AuthLayout from "@/components/layout/AuthLayout";
import LanguageToggle from "@/components/ui/language-toggle";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mirrored, setMirrored] = useState(false);
  const [formError, setFormError] = useState(null);

  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { t, isRTL, language } = useLanguage();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

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

  const heroCopy = useMemo(() => {
    if (isRTL) {
      return {
        badge: "بوابة العملاء الآمنة",
        headline: "مرحباً بعودتك إلى بوابتك القانونية",
        subheadline:
          "ادخل إلى لوحة التحكم لمتابعة قضاياك والتواصل مع فريقنا القانوني المتخصص.",
        highlights: [
          { icon: ShieldCheck, text: "حماية بيانات مشفرة بأعلى المعايير الدولية" },
          { icon: Users, text: "تواصل مباشر مع المحامين والمستشارين" },
          { icon: CheckCircle, text: "متابعة لحظية لتطورات القضايا والجلسات" },
        ],
        stats: [
          { value: "٢٤/٧", label: "دعم متواصل" },
          { value: "+٥٠٠", label: "عميل نشط" },
        ],
      };
    }

    return {
      badge: "Secure Client Portal",
      headline: "Welcome Back to Your Legal Hub",
      subheadline:
        "Access your dashboard to track cases, communicate with our legal team, and manage your matters.",
      highlights: [
        { icon: ShieldCheck, text: "Enterprise-grade encryption protecting your sensitive data" },
        { icon: Users, text: "Direct communication with attorneys and legal advisors" },
        { icon: CheckCircle, text: "Real-time updates on case progress and court sessions" },
      ],
      stats: [
        { value: "24/7", label: "Support Available" },
        { value: "500+", label: "Active Clients" },
      ],
    };
  }, [isRTL]);

  const shouldReverse = useMemo(() => (isRTL ? !mirrored : mirrored), [isRTL, mirrored]);

  // ✅ no AuthHighlight types in JSX; just provide the shape AuthLayout needs
  const heroHighlights = useMemo(() => {
    return heroCopy.highlights.map(({ icon: Icon, text }, idx) => ({
      icon: <Icon key={`hi-icon-${idx}`} className="h-5 w-5" />,
      text,
    }));
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
      await login(email, password);

      toast({
        title: t("auth.login.success_title") || t("common.success"),
        description: t("auth.login.success"),
      });

      const nextUrl = searchParams.get("next") || "/dashboard";
      navigate(nextUrl, { replace: true });
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? error.message
          : t("auth.login.error");

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
        className="border-border/50 bg-background/70 text-xs font-medium backdrop-blur hidden sm:flex"
        onClick={() => setMirrored((prev) => !prev)}
        aria-pressed={mirrored}
        aria-label={t("auth.login.swap_layout_aria")}
      >
        <ArrowLeftRight className="h-4 w-4" />
        <span className="ml-1">{t("auth.login.swap_layout")}</span>
      </Button>

      <ThemeToggle tone="light" />
      <LanguageToggle />
    </>
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <AuthLayout
      heroSide={shouldReverse ? "right" : "left"}
      toolbar={toolbar}
      hero={{
        badge: (
          <>
            <Sparkles className="h-4 w-4" />
            <span>{heroCopy.badge}</span>
          </>
        ),
        title: heroCopy.headline,
        description: heroCopy.subheadline,
        highlights: heroHighlights,
        stats: heroCopy.stats,
      }}
      card={{
        icon: (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <UserCheck className="h-6 w-6 text-primary" />
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
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-destructive/10 border border-destructive/30 text-destructive"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{formError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t("auth.login.email")}
                </Label>

                <div className="relative">
                  <Mail
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                      isRTL ? "right-3" : "left-3"
                    )}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.login.email_placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn("h-11", isRTL ? "pr-10" : "pl-10")}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
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
                  <Lock
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                      isRTL ? "right-3" : "left-3"
                    )}
                  />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.login.password_placeholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn("h-11", isRTL ? "pr-10 pl-12" : "pl-10 pr-12")}
                    required
                    autoComplete="current-password"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 h-8 w-8 p-0",
                      isRTL ? "left-1" : "right-1"
                    )}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? t("auth.login.hide_password") : t("auth.login.show_password")
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  {language === "ar" ? "تذكرني" : "Remember me"}
                </Label>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    {t("common.loading")}
                  </span>
                ) : (
                  <>
                    {t("auth.login.submit")}
                    <ArrowRight className={cn("ml-2 h-4 w-4", isRTL && "rotate-180")} />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {language === "ar" ? "أو" : "or"}
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3 text-center text-sm">
              <p className="text-muted-foreground">
                {t("auth.login.no_account")}{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  {t("auth.signup.submit")}
                </Link>
              </p>

              <p>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === "ar" ? "← العودة للصفحة الرئيسية" : "← Back to home"}
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3 mt-4",
                isRTL ? "flex-row-reverse text-right" : ""
              )}
            >
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>

              <div className="text-xs space-y-0.5">
                <p className="font-semibold text-foreground">
                  {language === "ar" ? "بوابة آمنة" : "Secure Portal"}
                </p>
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? "بياناتك محمية بتشفير SSL 256-bit"
                    : "Your data is protected with 256-bit SSL encryption"}
                </p>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default Login;
