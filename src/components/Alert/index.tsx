// UTILS
import classNames from "../../utils/classNames";

// TYPES
import type { ThemeType } from "../../types/themeType.type";
type Props = {
  type: ThemeType,
  title: string;
  children?: JSX.Element | string;
  className?: string;
};

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

const CTitleText = {
  'warning': 'text-yellow-800',
  'error': 'text-red-800',
  'info': 'text-blue-800',
  'success': 'text-green-800',
  'default': 'text-neutral-800',
};

const CBodyText = {
  'warning': 'text-yellow-700',
  'error': 'text-red-700',
  'info': 'text-blue-700',
  'success': 'text-green-700',
  'default': 'text-neutral-700',
};

const CIconClass = {
  'warning': 'ri-alert-fill',
  'error': 'ri-close-circle-fill',
  'info': 'ri-spam-2-fill',
  'success': 'ri-checkbox-circle-fill',
  'default': 'ri-chat-3-line',
};

export default function Alert({ type, title, children, className }: Props) {
  return (
    <div className={classNames("rounded-md p-4", CTypeDiv[type], className ? className : '')}>
      <div className="flex">
        <div className="flex-shrink-0">
          <i className={classNames("text-xl", CIconClass[type], CIconText[type])} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={classNames("text-sm font-medium", CTitleText[type])}>{title}</h3>
          {children && (
            <div className={classNames("mt-1 text-sm", CBodyText[type])}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}