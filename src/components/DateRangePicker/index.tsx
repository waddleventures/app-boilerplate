/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

// TYPES
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";

type Props = {
  value?: DateValueType | null | undefined;
  onChange: (val: DateValueType) => void;
}

export default function SingleDatePicker({ value, onChange }: Props) {
  // STATE
  const [selectedDateRange, setSelectedDateRange] = useState<DateValueType>({
    startDate: value?.startDate || null,
    endDate: value?.endDate || null,
  });

const handleValueChange = (newValue: DateValueType) => {
  setSelectedDateRange(newValue);
  onChange(newValue);
}

return (
  <div>
    <Datepicker
      inputClassName="block w-full rounded-md border border-gray-300 text-sm shadow-sm transition-all focus:outline-none focus:border-emerald-700 focus:ring-emerald-700 font-normal focus:ring-[1.5px]"
      toggleClassName="top-0"
      primaryColor={"emerald"} 
      value={selectedDateRange}
      onChange={handleValueChange}
    />
  </div>
);
}