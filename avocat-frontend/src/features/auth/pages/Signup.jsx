import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import { Checkbox } from "@shared/ui/checkbox";
import ThemeToggle from "@shared/ui/theme-toggle";
import LanguageToggle from "@shared/ui/language-toggle";
import { cn } from "@shared/lib/utils";
import useAuth from "@features/auth/components/AuthUser";
import { useAlert } from "@shared/contexts/AlertContext";
import { useLanguage } from "@shared/contexts/LanguageContext";
import AuthLayout from "@shared/layout/AuthLayout";

const Signup = () => {
  const { register, isAuthenticated } = useAuth();
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const heroCopy = useMemo(() => {
    if (isRTL) {
      return {
        badge: "ابدأ رحلتك القانونية",
        headline: "انضم إلى منصة أفوكات الآن",
        subheadline: "أنشئ حسابك للوصول إلى فريقك القانوني وإدارة ملفاتك بسرعة وأمان.",
        highlights: [
          { icon: ShieldCheck, text: "تهيئة فورية لملفاتك وقضاياك" },
          { icon: UserPlus, text: "دعم مباشر من فريق الاستشارات" },
        ],
        stats: [
          { value: "+١٥", label: "عام خبرة" },
          { value: "%٩٨", label: "رضا العملاء" },
        ],
      };
    }

    return {
      badge: "Start your legal journey",
      headline: "Join Avocat in minutes",
      subheadline: "Create your account to access your legal team and manage your files with clarity.",
      highlights: [
        { icon: ShieldCheck, text: "Instant workspace setup for your cases" },
        { icon: UserPlus, text: "Concierge support from our legal advisors" },
      ],
      stats: [
        { value: "15+", label: "Years of Practice" },
        { value: "98%", label: "Client Satisfaction" },
      ],
    };
  }, [isRTL]);

  if (isAuthenticated) {
    const nextUrl = searchParams.get("next") || "/dashboard";
    return <Navigate to={nextUrl} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("auth.signup.password_mismatch"));
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, email, password, confirmPassword);
    setIsSubmitting(false);

    if (success) {
      triggerAlert("success", t("auth.signup.success"));
      const nextUrl = searchParams.get("next") || "/dashboard";
      navigate(nextUrl, { replace: true });
      return;
    }

    setError(t("auth.signup.error"));
    triggerAlert("error", t("auth.signup.error"));
  };

  const toolbar = (
    <>
      <ThemeToggle tone="light" />
      <LanguageToggle />
    </>
  );

  return (
    <AuthLayout
      heroSide="right"
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
        highlights: heroCopy.highlights.map((highlight, idx) => ({
          icon: <highlight.icon key={`hi-${idx}`} className="h-5 w-5" />,
          text: highlight.text,
        })),
        stats: heroCopy.stats,
      }}
      card={{
        icon: (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
            <UserPlus className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
        ),
        title: t("auth.signup.title"),
        description: t("auth.signup.subtitle"),
        content: (
          <div className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-[hsl(var(--destructive))]/30 bg-[hsl(var(--destructive))]/10 px-4 py-3 text-sm text-[hsl(var(--destructive))]"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">{t("auth.signup.name")}</Label>
                <Input
                  id="full-name"
                  type="text"
                  placeholder={t("auth.signup.name_placeholder")}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">{t("auth.signup.email")}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder={t("auth.signup.email_placeholder")}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{t("auth.signup.password")}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder={t("auth.signup.password_placeholder")}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("auth.signup.confirm_password")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder={t("auth.signup.confirm_password_placeholder")}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-muted-foreground">
                    {t("auth.signup.terms")}
                  </Label>
                </div>
                <Link to="/login" className="text-primary hover:underline">
                  {t("auth.signup.have_account")}
                </Link>
              </div>
              <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("auth.signup.loading") : t("auth.signup.submit")}
                <ArrowRight className={cn("ml-2 h-4 w-4", isRTL && "rotate-180 mr-2 ml-0")} />
              </Button>
            </form>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                {isRTL ? `← ${t("common.backToHome")}` : `← ${t("common.backToHome")}`}
              </Link>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default Signup;
