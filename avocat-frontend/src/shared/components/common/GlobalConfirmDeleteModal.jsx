import React, { Fragment } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@shared/ui/button';

const GlobalConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[hsl(var(--overlay))] backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="modal-surface modal-motion w-full max-w-md overflow-hidden rounded-[1.75rem] p-6 text-start sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="premium-icon-shell h-12 w-12 shrink-0 !border-[hsl(var(--destructive)/0.28)] !bg-[linear-gradient(180deg,hsl(var(--destructive)/0.18),hsl(var(--destructive)/0.08))] !text-destructive !shadow-[var(--shadow-danger-glow)]">
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <div className="space-y-3">
                    <Dialog.Title className="text-lg font-bold text-foreground sm:text-xl">
                      تأكيد الحذف
                    </Dialog.Title>
                    <p className="text-sm leading-6 text-muted-foreground">
                      هل أنت متأكد أنك تريد حذف{' '}
                      <span className="font-semibold text-destructive">{itemName}</span>
                      ؟ هذا الإجراء يُبرز الهوية الحمراء الحرجة ولا يمكن التراجع عنه بسهولة.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button type="button" variant="secondary" onClick={onClose} className="rounded-xl">
                    إلغاء
                  </Button>
                  <Button type="button" variant="destructive" onClick={onConfirm} className="rounded-xl">
                    تأكيد الحذف
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GlobalConfirmDeleteModal;
