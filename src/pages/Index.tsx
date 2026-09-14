import { Link } from 'react-router-dom';
import { SchoolBrand } from '@/components/brand/SchoolBrand';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <SchoolBrand className="mb-4 justify-center" imageClassName="h-20" />
        <h1 className="font-heading text-2xl font-bold text-foreground">Colégio Deus Connosco</h1>
        <p className="mt-2 text-sm text-muted-foreground">Redirecting...</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default Index;
