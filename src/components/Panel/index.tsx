
// UTILS
import classNames from "../../utils/classNames";

// TYPES
import {type ReactElement } from "react";

type Props = {
  title?: string;
  description?: string;
  footer?: ReactElement;
  children: ReactElement;
  className?: string;
}
export default function Panel({ title, description, className, footer, children }: Props) {
  return (
    <section
      className={classNames(
        "shadow rounded-md bg-white",
        className ? className : ''
      )}
    >
      {(title || description) && (
        <div className="py-5 px-4 border-b border-gray-200">
          {title && (
            <h2 id="payment-details-heading" className="text-lg font-medium leading-4 text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}

      <div className={classNames("px-4", footer ? 'py-3' : 'pt-3 pb-6')}>
        {children}
      </div>
      {footer && (
        <div className="bg-gray-50 px-4 py-3 text-right rounded-b-md">
          {footer}
        </div>
      )}
    </section>
  )
}