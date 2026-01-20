import React, { useState, useEffect, Fragment } from 'react';
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
const GlobalModal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
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
                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-indigo-100  font-bold dark:bg-gradient-night p-8 shadow-2xl transition-all`}
              >
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <Dialog.Title className="text-3xl text-bold text-avocat-blue dark:text-avocat-orange  ">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="
    text-avocat-orange 
    dark:text-white 
    hover:text-avocat-red 
    dark:hover:text-avocat-orange
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
