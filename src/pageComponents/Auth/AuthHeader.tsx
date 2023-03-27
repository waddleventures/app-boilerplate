import Link from "next/link"
import FormattedLink from "../../components/FormattedLink"

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
          <FormattedLink href="/auth/sign-in?signUp=true">
            sign up if you don&apos;t have an account
          </FormattedLink>
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
      <Logo.New />
      <h2 className="mt-12 text-3xl font-bold tracking-tight text-gray-900">
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