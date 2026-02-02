import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

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
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all dark:bg-gray-800">
                <Dialog.Title className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  تأكيد الحذف
                </Dialog.Title>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  هل أنت متأكد أنك تريد حذف{' '}
                  <span className="font-bold text-red-500">{itemName}</span>؟
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    تأكيد
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    إلغاء
                  </button>
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
