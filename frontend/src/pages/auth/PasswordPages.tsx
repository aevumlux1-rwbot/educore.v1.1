import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success('Se o email existir, receberá instruções em alguns minutos.');
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link to="/login" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Voltar ao login</Link>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary"><GraduationCap className="h-5 w-5 text-primary-foreground" /></div>
          <h1 className="font-heading text-xl font-bold text-foreground">Recuperar palavra-passe</h1>
          <p className="mt-1 text-xs text-muted-foreground">Enviaremos um link de recuperação para o seu email.</p>
        </div>
        {!sent ? (
          <form onSubmit={submit} className="space-y-3">
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@escola.mz" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
            <button type="submit" className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Enviar link</button>
          </form>
        ) : (
          <div className="rounded-2xl border border-success/30 bg-success/5 p-5 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-success" />
            <p className="text-sm font-medium text-foreground">Verifique o seu email</p>
            <p className="mt-1 text-xs text-muted-foreground">Enviámos instruções para <span className="font-medium text-foreground">{email}</span>.</p>
            <Link to="/login" className="mt-4 inline-block text-xs font-medium text-primary hover:underline">Voltar ao login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 6) return toast.error('A palavra-passe deve ter pelo menos 6 caracteres.');
    if (pw !== pw2) return toast.error('As palavras-passe não coincidem.');
    toast.success('Palavra-passe redefinida com sucesso.');
    navigate('/login');
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary"><GraduationCap className="h-5 w-5 text-primary-foreground" /></div>
          <h1 className="font-heading text-xl font-bold text-foreground">Definir nova palavra-passe</h1>
          <p className="mt-1 text-xs text-muted-foreground">Escolha uma palavra-passe segura.</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input required type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Nova palavra-passe" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
          <input required type="password" value={pw2} onChange={e => setPw2(e.target.value)} placeholder="Confirmar palavra-passe" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
          <button type="submit" className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Redefinir</button>
        </form>
      </div>
    </div>
  );
}
