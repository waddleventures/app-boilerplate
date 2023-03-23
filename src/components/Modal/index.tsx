import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// UTILS
import classNames from '../../utils/classNames';

// TYPES
type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  cancelButton: JSX.Element;
  confirmButton: JSX.Element;
  children?: JSX.Element;
  type: 'warning' | 'error' | 'info' | 'success' | 'default';
  icon?: JSX.Element;
}

const CTypeDiv = {
  'warning': 'bg-yellow-50',
  'error': 'bg-red-50',
  'info': 'bg-blue-50',
  'success': 'bg-green-50',
  'default': 'bg-neutral-50',
};

const CIconText = {
  'warning': 'text-yellow-400',
  'error': 'text-red-400',
  'info': 'text-blue-400',
  'success': 'text-green-400',
  'default': 'text-neutral-400',
};

const CIconClass = {
  'warning': 'ri-alert-fill',
  'error': 'ri-close-circle-fill',
  'info': 'ri-spam-2-line',
  'success': 'ri-checkbox-circle-fill',
  'default': 'ri-chat-3-line',
};

export default function Modal({ open, onClose, title, type, cancelButton, confirmButton, children }: Props) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
                <div className="bg-white p-6 pb-4">
                  <div className='flex items-start'>
                    {type !== 'default' && (
                      <div className={classNames("mx-0 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", CTypeDiv[type])}>
                        <i className={classNames("text-2xl", CIconClass[type], CIconText[type])} aria-hidden="true" />
                      </div>
                    )}
                    <div className="mt-0 ml-4 text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-4 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-4 mb-4">
                        {children && children}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 py-3 flex justify-end px-6 space-x-3">
                  {cancelButton}
                  {confirmButton}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}