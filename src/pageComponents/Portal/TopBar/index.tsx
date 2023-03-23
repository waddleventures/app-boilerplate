// COMPONENTS
import Logo from "../../../components/Logo";
import PortalNavigation, { type PortalNavigationItem } from "../Navigation";
import PortalUserNavigation from "../UserNavigation";

// CONSTANTS
const navigation: PortalNavigationItem[] = [
  { label: 'Home', href: '/portal', exactPathMatch: true, },
  { label: 'Activities', href: '/portal/activities' },
  { label: 'Rewards', href: '/portal/rewards' },
  { label: 'Inbox', href: '/portal/inbox' },
]

export default function PortalTopBar() {
  return (
    <div className="bg-emerald-700 h-16 flex items-center justify-center">
      <div className="max-w-6xl w-full flex items-center">
        <Logo.Inverted />
        <div className="ml-8">
          <PortalNavigation items={navigation} />
        </div>
        <div className="ml-auto">
          <PortalUserNavigation />
        </div>
      </div>
    </div>
  )
}