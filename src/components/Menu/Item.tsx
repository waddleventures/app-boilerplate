import Link from "next/link";
import { useRouter } from "next/router";

// UTILS
import classNames from "../../utils/classNames";
import { isActivePath } from "../../utils/isActivePath";

// TYPES
export type TMenuItemHref = {
  iconClass: string;
  label: string;
  href: string;
  exactPathMatch?: boolean;
  theme: 'default' | 'inverted';
};

export type TMenuItemOnClick = {
  onClick: () => void;
  isActive: boolean | (() => boolean);
  iconClass: string;
  label: string;
  theme: 'default' | 'inverted';
};

// THEMING
const CTheme = {
  default: {
    base: 'hover:bg-neutral-100',
    active: 'bg-neutral-100',
    inactive: 'bg-white',
  },
  inverted: {
    base: 'hover:bg-white',
    active: 'bg-white',
    inactive: 'bg-neutral-50',
  },
};

const CIconTheme = {
  default: {
    base: 'group-hover:text-neutral-700',
    active: 'text-neutral-700',
    inactive: 'text-neutral-500',
  },
  inverted: {
    base: 'group-hover:text-primary-hover',
    active: 'text-primary-hover',
    inactive: 'text-neutral-500',
  },
}

const CTextTheme = {
  default: {
    base: 'group-hover:text-neutral-900',
    active: 'text-neutral-900',
    inactive: 'text-neutral-700',
  },
  inverted: {
    base: 'group-hover:text-primary-darkest',
    active: 'text-primary-darkest',
    inactive: 'text-neutral-700',
  },
}

export function MenuItemHref({ iconClass, label, href, theme, exactPathMatch = false }: TMenuItemHref): JSX.Element {
  const router = useRouter();

  const isActive = isActivePath(href, router.asPath, exactPathMatch);

  return (
    <li>
      <Link
        href={href}
        className={classNames(
          "flex items-center px-3 py-1 rounded-md group",
          CTheme[theme].base,
          isActive
            ? CTheme[theme].active
            : CTheme[theme].inactive,
        )}
      >
        <i 
          className={classNames(
            iconClass,
            "text-xl mr-5",
            CIconTheme[theme].base,
            isActive
              ? CIconTheme[theme].active
              : CIconTheme[theme].inactive,
          )}
        />
        <span
          className={classNames(
            "text-sm font-medium",
            CTextTheme[theme].base,
            isActive
              ? CTextTheme[theme].active
              : CTextTheme[theme].inactive,
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  )
}


export function MenuItemOnClick({ iconClass, label, onClick, isActive, theme }: TMenuItemOnClick): JSX.Element {
  return (
    <li>
      <div
        onClick={onClick}
        className={classNames(
          "flex items-center px-3 py-1 rounded-md group cursor-pointer",
          CTheme[theme].base,
          isActive
            ? CTheme[theme].active
            : CTheme[theme].inactive,
        )}
      >
        <i 
          className={classNames(
            iconClass,
            "text-xl mr-5",
            CIconTheme[theme].base,
            isActive
              ? CIconTheme[theme].active
              : CIconTheme[theme].inactive,
          )}
        />
        <span
          className={classNames(
            "text-sm font-medium",
            CTextTheme[theme].base,
            isActive
              ? CTextTheme[theme].active
              : CTextTheme[theme].inactive,
          )}
        >
          {label}
        </span>
      </div>
    </li>
  )
}