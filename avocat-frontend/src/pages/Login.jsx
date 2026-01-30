import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import ThemeToggle from '@/components/ui/theme-toggle';
import LanguageToggle from '@/components/ui/language-toggle';
import { cn } from '@/lib/utils';
import useAuth from '@/components/auth/AuthUser';
import { useAlert } from '@/contexts/AlertContext';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { triggerAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      triggerAlert('success', 'تم تسجيل الدخول بنجاح!');
      const params = new URLSearchParams(location.search);
      const nextPath = params.get('next') || '/dashboard';
      navigate(nextPath, { replace: true });
      return;
    }

    setError('فشل تسجيل الدخول. تحقق من البيانات.');
    triggerAlert('error', 'فشل تسجيل الدخول. تحقق من البيانات.');
  };

  return (
    <div className="relative min-h-screen bg-gradient-night text-white">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-4xl items-center justify-between gap-4">
          <Link
            to="/"
            className={cn(
              'text-sm font-medium text-white/80 transition hover:text-white',
            )}
          >
            Back to home
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle tone="hero" />
          </div>
        </div>

        <div className="mt-10 w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-xl backdrop-blur">
          <h1 className="text-center text-3xl font-bold text-white">
            تسجيل الدخول
          </h1>
          <p className="mt-2 text-center text-sm text-white/70">
            مرحبًا بعودتك! الرجاء إدخال بياناتك للمتابعة.
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2 text-right">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-white/80">
                  تذكرني
                </Label>
              </div>
              <Link to="/signup" className="text-white/80 hover:text-white">
                إنشاء حساب جديد
              </Link>
            </div>
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
