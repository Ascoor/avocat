import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  IoMdClose,
  IoMdPerson,
  IoMdMail,
  IoMdCall,
  IoMdCalendar,
  IoMdPin,
  IoMdConstruct,
} from 'react-icons/io';
import DatePicker from 'react-datepicker';
const GlobalModal = ({ isOpen, onClose, title, subtitle, titleIcon, children, size = 'lg' }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`modal-surface modal-motion w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl p-6 shadow-2xl transition-all`}
              >
                <div className="flex justify-between items-start border-b border-border pb-4 mb-6">
                  <div className="flex items-start gap-3">
                    {titleIcon && (
                      <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {titleIcon}
                      </span>
                    )}
                    <div>
                      <Dialog.Title className="text-xl font-semibold text-foreground">
                        {title}
                      </Dialog.Title>
                      {subtitle && (
                        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="
    text-muted-foreground 
    hover:text-foreground 
    transition-colors 
    duration-300"
                  >
                    <IoMdClose className="w-6 h-6" />
                  </button>
                </div>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GlobalModal;
