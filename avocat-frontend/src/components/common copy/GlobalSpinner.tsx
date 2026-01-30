import { Loader2 } from 'lucide-react';

const GlobalSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

export default GlobalSpinner;
