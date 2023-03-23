import Link from "next/link"

// COMPONENTS
import Logo from "../../components/Logo"

const SignUpNewOrg = () => {
  return (
    <AuthHeader
      title="Welcome to &lt;Product Name&gt;!"
      secondary="Let&apos;s get you started."
    />
  )
}

const AcceptInvitation = ({ organizationName }: { organizationName: string }) => {
  return (
    <AuthHeader
      title={`Welcome to ${organizationName}'s workspace on <Product Name>!`}
      secondary="Let&apos;s get your account set up."
    />
  )
}

const SignIn = () => {
  return (
    <AuthHeader
      title="Sign in to your account"
      secondary={(
        <>
           Or{' '}
          <Link href="/auth/sign-in?signUp=true" className="font-medium text-emerald-700 hover:text-emerald-900">
            sign up if you don&apos;t have an account
          </Link>
        </>
      )}
    />
  )
}

const HasError = () => {
  return (
    <AuthHeader
      title={`Uh oh...`}
      secondary="We&apos;'re sorry but it seems we were unable to sign you in."
    />
  )
}

const AuthHeader = ({ title, secondary }: { title: string, secondary: string | JSX.Element }) => {
  return (
    <div>
      <Logo.Regular />
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        {secondary}
      </p>
    </div>
  )
}

const components = {
  SignIn: SignIn,
  SignUpNewOrg: SignUpNewOrg,
  AcceptInvitation: AcceptInvitation,
  HasError: HasError,
};

export default components;