import Link from "next/link";

// UTILS
import classNames from "../../utils/classNames";

type ListItem = {
  key: string;
  actionType: 'href' | 'onClick' | 'none';
  href?: string;
  onClick?: () => void;
  columns: JSX.Element[];
}

type Props = {
  items: ListItem[];
  className?: string;
  empty?: JSX.Element;
}

function ItemDetailsArrow() {
  return (
    <i className="ri-arrow-right-s-line text-3xl text-gray-400 group-hover:text-gray-700"></i>
  );
}

export default function List({ items, className, empty }: Props) {
  const atLeastOneItemHasAction = items.some((item) => item.actionType !== 'none');

  return (
    <>
      <ul
        role="list"
        className={classNames("divide-y divide-gray-200", className ? className : '' )}
      >
        {items.map((item) => (
          <li
            key={item.key}
            className={classNames("flex items-center py-3 px-4 group")}
          >
            <div className={classNames("flex flex-grow items-center space-x-4 justify-between", atLeastOneItemHasAction ? 'mr-24' : '')} >
              {item.columns.map((column, idx) => <div key={idx}>{column}</div>)}
            </div>
            {item.actionType !== 'none' && (
              <div className="ml-auto">
                {item.href != null && (
                  <Link href={item.href}>
                    <ItemDetailsArrow />
                  </Link>
                )}
                {item.onClick != null && (
                  <div onClick={item.onClick}>
                    <ItemDetailsArrow />
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {((!items || !items.length) && empty) && empty}
    </>
  );
}