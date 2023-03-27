// COMPONENTS
import Label from "../../Label";

// UTILS
import classNames from "../../../../utils/classNames";


// TYPES
type Props = {
  label?: string;
  type: 'text' | 'email' | 'phone' | 'number';
  placeholder?: string;
  value: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any) => void;
  error?: string;
  children?: JSX.Element;
  disabled?: boolean;
}

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
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
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={!onChange}
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