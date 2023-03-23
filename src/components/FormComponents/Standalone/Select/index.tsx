import { useMemo, useState } from 'react'
import { Combobox } from '@headlessui/react'

// UTILS
import classNames from '../../../../utils/classNames';

// TYPES
export type SelectValue = Required<{ id: string, label: string }>;

type Props = {
  value: SelectValue | null;
  values?: SelectValue[];
  allowCreate: boolean;
  placeholder?: string;
  onChange: (value: SelectValue) => void;
}

export default function Select({ value, values, allowCreate, onChange, placeholder }: Props) {

  // STATE
  const [query, setQuery] = useState('')

  // EVENT HANDLERS
  const onHandleChange = (value: SelectValue) => {
    onChange(value);
  }

  // MEMO
  const filteredValues: SelectValue[] = useMemo(() => {
    // Remove current selection if any
    if (query.length < 3) return values || [];
    return (values || []).filter((v) => {
      return v.label.toLowerCase().includes(query.toLowerCase())
    });
  }, [values, query]);

  const shouldShowCreateOption = useMemo(() => {
    // Query length is >= 3
    // No value matches exactly
    return allowCreate && query.length >= 3 && (values || []).findIndex((el) => el.label === query) === -1;
  }, [query, values, allowCreate]);

  return (
    <Combobox as="div" value={value} onChange={onHandleChange}>
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(value: SelectValue) => value?.label}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r-md px-2 focus:outline-none">
          <i className="ri-arrow-down-s-fill text-lg text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {shouldShowCreateOption && (
            <Combobox.Option
              className="text-gray-900 relative select-none py-2 pl-3 pr-9 hover:bg-neutral-100 cursor-pointer"
              value={{ id: null, label: query }}
            >
              Create <span className="font-semibold"><i>&quot;{query}&quot;</i></span>
            </Combobox.Option>
          )}
          {filteredValues.map((value) => (
            <Combobox.Option
              key={value.id}
              value={value}
              className={({ active }) =>
                classNames(
                  'relative cursor-pointer select-none py-2 pl-3 pr-9',
                  active ? 'bg-emerald-700 text-white' : 'text-gray-900'
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span className={classNames('block truncate', selected && 'font-semibold')}>{value.label}</span>

                  {selected && (
                    <span
                      className={classNames(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-emerald-700'
                      )}
                    >
                      <i className="ri-check-line h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}