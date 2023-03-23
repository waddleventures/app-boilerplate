import Link from "next/link";

export default function FormattedLink({ href, children }: { href: string, children: JSX.Element | string }): JSX.Element {
  return <Link href={href} className="text-emerald-600 hover:text-emerald-900 font-semibold">{children}</Link>
}