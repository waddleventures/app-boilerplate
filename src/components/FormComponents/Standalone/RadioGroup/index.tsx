// TYPES
type Props = {
  value: string;
  name: string;
  label?: string;
  onChange: (value: string) => void;
  options: Required<{ value: string, label: string }>[];
}

export default function RadioGroup({ value, name, label, onChange, options }: Props): JSX.Element {
  return (
    <div className="max-w-lg">
      {label && (<p className="text-sm text-gray-500">{label}</p>)}
      <div className="mt-4 space-y-4">
        {options.map((opt) => (
          <div className="flex items-center" key={opt.value}>
            <input
              name={name}
              type="radio"
              className="h-4 w-4 cursor-pointer border-gray-300 text-emerald-700 focus:ring-emerald-700"
              value={opt.value}
              checked={opt.value === value}
              onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              {opt.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}