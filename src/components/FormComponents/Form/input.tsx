/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
// COMPONENTS
import Label from "../Label";

// UTILS
import classNames from "../../../utils/classNames";

// TYPES
import type { RegisterOptions } from "react-hook-form";

type Props = {
  label?: string;
  type: 'text' | 'email' | 'phone' | 'number';
  placeholder?: string;
  name: string;
  register: any;
  rules: RegisterOptions;
  error?: any;
  children?: JSX.Element;
  disabled?: boolean;
}

export default function FormInput({
  label,
  type,
  placeholder,
  name,
  register,
  rules,
  error,
  children,
  disabled = false
}: Props):JSX.Element {
  return (
    <div>
      {label && <Label label={label} />}
      <div className={classNames(
          "relative mt-1 rounded-md",
          children ? 'flex' : ''
        )}
      >
        <input
          {...register(name, rules)}
          type={type}
          className={classNames(
            "block w-full rounded-md focus:outline-none border text-sm shadow-sm transition-all",
            "disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500",
            children ? 'mr-2' : '',
            error
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 shadow-sm focus:border-primary-hover focus:ring-primary-hover",
          )}
          placeholder={placeholder}
          disabled={disabled}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <i className="ri-error-warning-fill h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        {children && children}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  )
}