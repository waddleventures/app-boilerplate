// TYPES
type Props = {
  header: JSX.Element | string,
  children: JSX.Element,
}

export default function AuthLayout({ header, children }: Props) {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center py-12 flex-none px-20">
        <div className="mx-auto w-96">
          {header}
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  )
}