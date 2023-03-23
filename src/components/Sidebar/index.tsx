// COMPONENTS
import Logo from "../Logo";
import OrganizationLabel from "../OrganizationLabel";
import Menu from "../Menu";
import MenuLabel from "../Menu/Label";

// UTILS
import classNames from "../../utils/classNames";

// TYPES
import type { TMenuItemHref, TMenuItemOnClick } from "../Menu/Item";

type Props = {
  menuItems: { label: string, items: (Omit<TMenuItemHref, 'theme'> | Omit<TMenuItemOnClick, 'theme'>)[], type: 'href' | 'onClick' }[],
  footer?: JSX.Element,
}

export default function Sidebar({ menuItems, footer }: Props):JSX.Element {
  return (
    <aside
      className={classNames(
        "w-64 min-h-screen drop-shadow-sm flex-shrink-0 flex flex-col",
        "bg-white p-4 pb-0"
      )}
    >
      <div className="flex flex-shrink-0 w-full space-x-2 items-center">
        <Logo.Regular />
        <OrganizationLabel />
      </div>
      {menuItems.map((item) => (
        <div className="space-y-2 mt-8" key={item.label}>
          <MenuLabel label={item.label} />
          {item.type === 'href'
            ? <Menu hrefItems={item.items as Omit<TMenuItemHref, 'theme'>[]} />
            : <Menu onClickItems={item.items as Omit<TMenuItemOnClick, 'theme'>[]} />
          }
        </div>
      ))}
      {footer && (
        <div className="bg-white mt-auto -mr-4 -ml-4 px-4 py-4 border-t border-t-gray-200 flex items-center">
          {footer}
        </div>
      )}
      
    </aside>
  )
}