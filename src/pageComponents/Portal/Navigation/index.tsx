import { useRouter } from "next/router";

// UTILS
import classNames from "../../../utils/classNames";
import { isActivePath } from '../../../utils/isActivePath';

// TYPES
export type PortalNavigationItem = {
  label: string;
  href: string;
  exactPathMatch?: boolean;
};

function PortalNavigationItem({ item }: { item: PortalNavigationItem }) {
  // HOOKS
  const router = useRouter();

  const isCurrent = isActivePath(item.href, router.asPath, item.exactPathMatch);

  return (
    <a
      href={item.href}
      className={classNames(
        isCurrent
          ? 'bg-emerald-900 text-white'
          : 'text-white hover:bg-emerald-800 hover:bg-opacity-75',
        'block px-3 py-2 rounded-md text-base font-medium'
      )}
    >
      {item.label}
    </a>
  );
}

export default function PortalNavigation({ items}: { items: PortalNavigationItem[] }) {
  return (
    <div className="flex">
      {items.map((item) => <PortalNavigationItem key={item.href} item={item} />)}
    </div>
  )
}