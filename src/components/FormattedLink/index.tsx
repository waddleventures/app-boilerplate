import Link from "next/link";

export default function FormattedLink({ href, children }: { href: string, children: JSX.Element | string }): JSX.Element {
  return <Link href={href} className="text-primary hover:text-primary-darkest font-semibold">{children}</Link>
}