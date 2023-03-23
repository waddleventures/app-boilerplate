import { type TMenuItemHref, type TMenuItemOnClick, MenuItemHref, MenuItemOnClick } from "./Item";

// TYPES
type Props = {
  hrefItems?: Omit<TMenuItemHref, 'theme'>[];
  onClickItems?: Omit<TMenuItemOnClick, 'theme'>[];
  theme?: 'default' | 'inverted';
}

export default function Menu({ hrefItems, onClickItems, theme = 'default' }: Props): JSX.Element {
  return (
    <ul>
      {(hrefItems || []).map((item) => (
          <MenuItemHref
            href={item.href}
            iconClass={item.iconClass}
            label={item.label}
            exactPathMatch={item.exactPathMatch}
            key={item.href}
            theme={theme}
          />
        )
      )}
      {(onClickItems || []).map((item) => (
         <MenuItemOnClick
          onClick={item.onClick}
          isActive={item.isActive}
          iconClass={item.iconClass}
          label={item.label}
          key={item.iconClass}
          theme={theme}
        />
      ))}
    </ul>
  )
}