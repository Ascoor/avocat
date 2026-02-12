import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionStateMessageProps {
  type: 'error' | 'empty';
  title?: string;
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
}

const SectionStateMessage = ({ type, title, message, retryLabel, onRetry }: SectionStateMessageProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-12 text-center"
  >
    {type === 'error' ? (
      <AlertCircle className="h-12 w-12 text-destructive mb-3" />
    ) : (
      <Inbox className="h-12 w-12 text-muted-foreground mb-3" />
    )}
    {title ? <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4> : null}
    <p className="text-muted-foreground mb-4">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="action-btn-outline">
        <RefreshCw className="h-4 w-4" />
        {retryLabel || 'Retry'}
      </button>
    )}
  </motion.div>
);

export default SectionStateMessage;
