// UTILS
import classNames from "../../utils/classNames";

// CONSTANTS
const CTypeClasses: Record<ThemeType, string> = {
  'default': 'bg-neutral-100 text-neutral-800',
  'info': 'bg-blue-100 text-blue-800',
  'success': 'bg-green-100 text-green-800',
  'warning': 'bg-yellow-100 text-yellow-800',
  'error': 'bg-red-100 text-red-800',
};

// TYPES
import type { ThemeType } from "../../types/themeType.type";

type Props = {
  type: ThemeType;
  children: string | JSX.Element;
  className?: string;
}

export default function Badge({ type, children, className }: Props) {
  return (
    <span 
      className={classNames(
        "rounded-full px-2 py-1 text-xs font-medium",
        CTypeClasses[type],
        className ? className : ''
      )}
    >
      {children}
    </span>
  )
}