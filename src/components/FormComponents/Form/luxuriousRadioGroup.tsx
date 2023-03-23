/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

// COMPONENTS
import Label from "../Label";

// UTILS
import classNames from "../../../utils/classNames";

// TYPES
import { type Control, type RegisterOptions, useWatch } from "react-hook-form";

type Props = {
  label?: string;
  name: string;
  register: any;
  rules: RegisterOptions;
  error?: any;
  disabled?: boolean;
  control: Control<any, any>;
  options: { value: string, label: string, description?: string, disabled?: boolean }[];
}

export default function FormLuxuriousRadioGroup({ name, register, control, rules, disabled = false, label, options }: Props): JSX.Element {
  const value = useWatch({ control, name });
  
  return (
    <div className="block">
      {label && <Label label={label} />}
      <div className="-space-y-px rounded-md bg-white">
        {options.map((option, idx) => (
          <div 
            key={option.value}
            className={
              classNames(
                idx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                idx === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                value === option.value ? 'bg-emerald-50 border-emerald-200 z-10' : 'border-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none',
                (option.disabled || disabled) ? 'cursor-not-allowed' : '',
              )
            }
          >
            <input
              {...register(name, rules)}
              type="radio"
              className={classNames("h-4 w-4 border-gray-300 text-emerald-700 focus:ring-emerald-700", (disabled || option.disabled) ? 'cursor-not-allowed' : 'cursor-pointer')}
              value={option.value}
              disabled={disabled || option.disabled}
            />
            <span className="ml-3 flex flex-col">
              <label
                className={classNames(
                  'block text-sm font-medium',
                  value === option.value ? 'text-emerald-900' : 'text-gray-900',
                )}
              >
                {option.label}
              </label>
              {option.description && (
                <span
                  className={classNames(value === option.value ? 'text-emerald-700' : 'text-gray-500', 'block text-sm')}
                >
                  {option.description}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}