
// TYPES
type Props = {
  message: string;
  children: JSX.Element;
}

export default function Popover({ message, children }: Props) {
  return (
    <div className="group relative flex justify-center">
      {children}
      <span className="absolute -top-8 whitespace-nowrap scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{message}</span>
    </div>
  )
}