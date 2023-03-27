import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

// UTILS
import classNames from '../../utils/classNames';

// TYPES
export type MenuItem = {
  label: string;
  iconClass?: string;
  key: string;
  isActive?: boolean;
}

export type MenuItemDivider = {
  type: 'divider';
}

type Props = {
  items: (MenuItem | MenuItemDivider)[];
  buttonLabel: string;
  className?: string;
  onClick: (key: string) => void;
}

export default function Dropdown({ buttonLabel, items, className, onClick }: Props) {
  return (
    <Menu as="div" className={classNames("relative inline-block text-left", className ? className : '')}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {buttonLabel}
          <i className="ri-arrow-down-s-line -mr-1 ml-2"></i>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, idx) => {
              if ("type" in item) {
                return (<div key={`divider-${idx}`}className='border w-full h-[1px] border-red-500 my-1' />);
              } else {
                return (
                  <Menu.Item key={item.key}>
                    {({ active }) => (
                      <div 
                        onClick={() => onClick(item.key)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm cursor-pointer'
                        )}
                      >
                        {item.iconClass && (
                          <i className={classNames(item.iconClass, "mr-3 text-lg text-gray-400 group-hover:text-gray-500")} />
                        )}
                        {item.label}
                        {item.isActive && (
                          <i className={classNames("ri-check-line", "ml-auto text-lg text-primary-hover")} />
                        )}
                      </div>
                    )}
                  </Menu.Item>
                )
              }
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}