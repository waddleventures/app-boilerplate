// COMPONENTS
import PageTitle from "../../components/PageTitle";

// UTILS
import { useBreadcrumbs } from "../../components/Breadcrumbs";

export default function SubscriptionPage() {
  // BREADCRUMBS
  useBreadcrumbs([{ name: 'Plan & Billing', href: '/subscriptions' }])
  
  return (
    <PageTitle title="Plan & Billing" />
  )
}

SubscriptionPage.requireAuth = true;