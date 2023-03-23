import { useSession, signOut } from "next-auth/react";

// COMPONENTS
import Sidebar from "../../components/Sidebar";
import { AvatarWithName } from "../../components/Avatar";

export default function LayoutSidebar():JSX.Element {
  const { data: session } = useSession();

  return (
    <Sidebar
      menuItems={[
        {
          label: 'Pages',
          type: 'href',
          items: [
            {
              href: "/",
              iconClass: "ri-home-smile-line",
              label: "Home",
              exactPathMatch: true
            },
            {
              href: "/customers",
              iconClass: "ri-chat-smile-2-line",
              label: 'Customers',
              exactPathMatch: false,
            },
            {
              href: "/portal",
              iconClass: "ri-layout-5-line",
              label: 'Customer Portal',
              exactPathMatch: false,
            },
          ]
        },
        {
          label: 'Settings',
          type: 'href',
          items: [
            {
              href: `/settings/account/${session?.user?.id || ''}`,
              iconClass: 'ri-account-box-line',
              label: 'Account',
              exactPathMatch: false,
            },
            {
              href: "/settings/users",
              iconClass: "ri-team-line",
              label: 'Users',
              exactPathMatch: false,
            },
            {
              href: "/plan-and-billing",
              iconClass: "ri-bill-line",
              label: "Plan & Billing",
              exactPathMatch: false
            },
            {
              href: "/integrations",
              iconClass: "ri-plug-line",
              label: 'Integrations',
              exactPathMatch: false,
            },
          ]
        }
      ]}
      footer={(
        <>
          <AvatarWithName name={session?.user?.name || ''} size="md" />
          <div className="ml-2">
            <div className="text-sm text-gray-900">{session?.user?.name || ''}</div>
            <div className="text-xs text-gray-500 hover:text-emerald-600 font-medium cursor-pointer" onClick={() => void signOut()}>Sign out</div>
          </div> 
        </>
      )}
    />
  );
}