import { Link } from 'react-router-dom';
import { Brand } from '@/components/shared/Brand';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-4 flex justify-center"><Brand size="lg" variant="mark" /></div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Colégio Deus Connosco</h1>
        <p className="mt-2 text-sm text-muted-foreground">A redireccionar…</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          Ir para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default Index;
