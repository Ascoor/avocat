import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LegalCase, BilingualLabels } from '@/types/legal';
import { Language } from '@/hooks/useLanguage';

interface AddEditLegCaseProps {
  legCase: LegalCase;
  labels: BilingualLabels;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LegalCase>) => void;
}

const AddEditLegCase = ({ legCase, labels, lang, isOpen, onClose, onSave }: AddEditLegCaseProps) => {
  const [title, setTitle] = useState(lang === 'ar' ? legCase.titleAr : legCase.title);
  const [description, setDescription] = useState(lang === 'ar' ? legCase.descriptionAr : legCase.description);

  const handleSave = () => {
    onSave(lang === 'ar'
      ? { titleAr: title, descriptionAr: description }
      : { title, description }
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-lg rounded-2xl bg-card p-6 shadow-xl border border-border"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">{labels.edit}</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.caseTitle}</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.caseDescription}</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={onClose} className="action-btn-outline">{labels.cancel}</button>
              <button onClick={handleSave} className="action-btn-accent">{labels.save}</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddEditLegCase;
