// UTILS
import classNames from "../../../../utils/classNames";

// TYPES
type Props = {
  label?: string;
  placeholder?: string;
  value: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any) => void;
  error?: string;
}
export default function TextArea({ label, placeholder, value, onChange, error }: Props) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-md">
        <textarea
          rows={3}
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded-md focus:outline-none border text-sm shadow-sm transition-all",
            error
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700",
          )}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={!onChange}
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