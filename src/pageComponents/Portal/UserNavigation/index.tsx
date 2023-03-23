import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// COMPONENTS
import { AvatarWithName } from "../../../components/Avatar";

// CONSTANTS
const navigation: PortalUserNavigationItem[] = [
  { label: 'Profile', href: '/portal/profile',  },
  { label: 'Sign out', onClick: () => void signOut() },
]

// TYPES
type PortalUserNavigationItem = {
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function PortalUserNavigation() {
  const session = useSession();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? '' : 'text-opacity-90'}
              group inline-flex items-center rounded-full text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
              <AvatarWithName
                name={session.data?.user?.name || ''}
                size='md'
              />
          </Popover.Button>
          <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-50 mt-3 -translate-x-1/2 transform px-4 w-40">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-white">
                    {navigation.map((item) => {
                      if (item.href)
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-neutral-50 text-center"
                          >
                            {item.label}
                          </Link>
                        )
                      if (item.onClick) {
                        return (
                          <button
                            key={item.label}
                            onClick={item.onClick}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-neutral-50 text-center"
                          >
                            {item.label}
                          </button>
                        )
                      }
                    })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
        </>
      )}
    </Popover>
  )
}