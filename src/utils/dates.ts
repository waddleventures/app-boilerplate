import { parse, format } from "date-fns";

// CONSTANTS
import { EMPTY_TABLE_COL } from "../constants/misc";

// TYPES
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";

export const parseDateValueTypeToDates = (date: DateValueType | undefined) => {
  const startDate = date?.startDate 
    ? typeof date.startDate === 'object'
      ? date.startDate
      : parse(date.startDate, 'yyyy-M-d', new Date())
    : undefined;
  const endDate = date?.endDate 
    ? typeof date.endDate === 'object'
      ? date.endDate
      : parse(date.endDate, 'yyyy-M-d', new Date())
    : undefined;

  return { startDate, endDate };
}

export const formatDateRange = (startDate: Date | undefined | null, endDate: Date | undefined | null): string => {
  return `${startDate ? format(startDate, 'yyyy-MM-dd') : EMPTY_TABLE_COL} ~ ${endDate ? format(endDate, 'yyyy-MM-dd') : EMPTY_TABLE_COL}`;
}