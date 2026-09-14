import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { SchoolBrand } from '@/components/brand/SchoolBrand';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <SchoolBrand imageClassName="h-12 md:h-14" />
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="px-6 pb-20 pt-16 text-center md:px-12 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
            <Zap className="h-3.5 w-3.5" />
            2027 enrolment · Digital school platform
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
            School information,
            <br />
            <span className="text-primary">organized in one place</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            The digital platform of Colégio Deus Connosco brings together the existing academic, financial, communication, and knowledge tools in one interface.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
            >
              Enter Platform <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: 'EDUOS', desc: 'Experience layer — dashboards, profiles, academic journey, chat, feed, and knowledge space.' },
            { icon: Shield, title: 'COREOS', desc: 'Financial engine — tuition, payments, treasury, reconciliation, and reporting.' },
            { icon: Globe, title: 'EDUOS Connect', desc: 'Integration layer — APIs, webhooks, external systems, and future banking integrations.' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center md:px-12">
        <p className="text-xs text-muted-foreground">© 2026 Colégio Deus Connosco. All rights reserved.</p>
      </footer>
    </div>
  );
}
