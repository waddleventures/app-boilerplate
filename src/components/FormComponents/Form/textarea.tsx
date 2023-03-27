/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
// UTILS
import classNames from "../../../utils/classNames";

// TYPES
import type { RegisterOptions } from "react-hook-form";

type Props = {
  label?: string;
  placeholder?: string;
  name: string;
  register: any;
  rules: RegisterOptions;
  error?: any;
}

export default function TextArea({ label, placeholder, register, rules, name, error }: Props) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-md">
        <textarea
          {...register(name, rules)}
          rows={3}
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded-md focus:outline-none border text-sm shadow-sm transition-all",
            error
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 shadow-sm focus:border-primary-hover focus:ring-primary-hover",
          )}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Your password must be less than 4 characters.
        </p>
      )}
    </div>
  )
}