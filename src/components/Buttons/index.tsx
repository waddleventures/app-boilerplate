import classNames from "../../utils/classNames";

// TYPES
type Props = {
  label?: string;
  submit?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'block';
  iconClass?: string;
  theme: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  className?: string;
  disabled?: boolean;
}

const CSizeClasses = {
  'sm': 'px-2 py-1',
  'md': 'px-4 py-2',
  'lg': 'px-6 py-3',
  'block': 'w-full py-2',
};

const CThemeClasses = {
  'primary': "bg-emerald-600 hover:bg-emerald-700 disabled:hover:bg-emerald-600 border border-emerald-600 hover:border-emerald-700 disabled:hover:border-emerald-600 text-white  focus:ring-2 focus:ring-emerald-500",
  'secondary': "border-neutral-300 border bg-white text-gray-700 hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:hover:bg-white",
  'ghost': "bg-white border-transparent text-emerald-700 hover:text-emerald-900 disabled:hover:text-emerald-700",
  'danger': "bg-red-100 border-transparent hover:bg-red-200 focus:ring-2 focus:ring-red-500 text-red-500 hover:text-red-700 disabled:hover:bg-red-100 disabled:hover:text-red-500",
  'success': "bg-green-100 border-transparent hover:bg-green-200 focus:ring-2 focus:ring-green-500 text-green-600 hover:text-green-700 disabled:hover:bg-green-100 disabled:hover:text-green-500"
}

export default function Button({ label, submit = false, onClick, size = 'md', iconClass, theme, className, disabled = false }: Props): JSX.Element {
  return (
    <button 
      type={submit ? 'submit' : 'button'}
      className={classNames(
        "inline-flex items-center justify-center rounded-md border text-sm font-medium shadow-sm focus:ring-offset-2 focus:outline-none ",
        CSizeClasses[size],
        CThemeClasses[theme],
        className ? className : '',
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {iconClass && (
        <i 
          className={classNames(
            iconClass,
            label ? "mr-2 -ml-1" : '',
          )}
        />
      )}
      {label && label}
    </button>
  )
}