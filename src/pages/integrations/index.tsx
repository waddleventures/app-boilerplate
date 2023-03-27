// COMPONENTS
import PageTitle from "../../components/PageTitle";

// UTILS
import { useBreadcrumbs } from "../../components/Breadcrumbs";

export default function IntegrationsPage() {
  // BREADCRUMBS
  useBreadcrumbs([{ name: 'Integrations', href: '/integrations' }])
  
  return (
    <PageTitle title="Integrations" />
  )
}

IntegrationsPage.requireAuth = true;