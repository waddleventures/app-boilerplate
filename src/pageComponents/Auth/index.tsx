import classNames from "../../utils/classNames"

// TYPES
type Props = {
  header: JSX.Element | string,
  children: JSX.Element,
}

export default function AuthLayout({ header, children }: Props) {
  return (
    <div
      className={classNames(
        "h-screen w-screen flex justify-center items-center",
      )}
      style={{
        background: 'linear-gradient(to right, #C4B5FD 0%, #A78BFA 30%, #7C3AED 60%, #5b21b6 100%)',
      }}
    >
      <div className="bg-white w-1/3 p-14 h-2/3 rounded-lg shadow-lg">
        {header}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  )
}