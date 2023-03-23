import { RadioGroup } from "@headlessui/react";

// UTILS
import classNames from "../../../../utils/classNames";

// TYPES
type Props = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  options: { value: string, label: string, description?: string, disabled?: boolean }[];
  disabled?: boolean;
}

export default function LuxuriousRadioGroup({ label, options, value, onChange, disabled }: Props) {

  return (
    <RadioGroup value={value} onChange={onChange}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="-space-y-px rounded-md bg-white">
        {options.map((option, idx) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            disabled={option.disabled || disabled}
            className={({ checked }) =>
              classNames(
                idx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                idx === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked ? 'bg-emerald-50 border-emerald-200 z-10' : 'border-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none',
                (option.disabled || disabled) ? 'cursor-not-allowed' : '',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked ? 'bg-emerald-600 border-transparent' : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-emerald-500' : '',
                    'mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center',
                    (option.disabled || disabled) ? 'cursor-not-allowed' : 'cursor-pointer',
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(checked ? 'text-emerald-900' : 'text-gray-900', 'block text-sm font-medium')}
                  >
                    {option.label}
                  </RadioGroup.Label>
                  {option.description && (
                    <RadioGroup.Description
                      as="span"
                      className={classNames(checked ? 'text-emerald-700' : 'text-gray-500', 'block text-sm')}
                    >
                      {option.description}
                    </RadioGroup.Description>
                  )}
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}