import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { SchoolBrand } from '@/components/brand/SchoolBrand';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="mb-8 text-center">
          <SchoolBrand className="mb-4 justify-center" imageClassName="h-20" />
          <h1 className="font-heading text-xl font-bold text-foreground">Colégio Deus Connosco</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Enter your credentials to continue</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Email</label>
            <input
              type="email"
              placeholder="name@institution.edu"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded border-input" />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Link
            to="/app"
            className="flex w-full items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sign in
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/apply" className="font-medium text-primary hover:underline">
            Apply here
          </Link>
        </p>
      </div>
    </div>
  );
}
