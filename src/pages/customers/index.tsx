import { useState } from "react";

// COMPONENTS
import Button from "../../components/Buttons";
import LoadingIndicator from "../../components/PageLoadingIndicator";
import CoreTable from "../../components/Table";
import CustomerColumns from '../../pageComponents/Tables/customers';
import InviteCustomerUserSlideOver from "../../pageComponents/SlideOvers/InviteCustomerUser";
import PageTitle from "../../components/PageTitle";

// UTILS
import { api } from "../../utils/api";
import { useBreadcrumbs } from "../../components/Breadcrumbs";

export default function Customers(): JSX.Element {  
  // HOOKS
  useBreadcrumbs([{ name: 'Customers', href: '/customers' }])

  // API
  const { data, isLoading } = api.customerUserProfile.getAll.useQuery();

  // STATE
  const [isSlideOverOpen, setIsSlideOverOpen] = useState<boolean>(false);

  return (
    <LoadingIndicator loading={isLoading}>
      <>
        <PageTitle
          title="Customers"
          description="Browse all customers"
        >
          <Button
            theme="primary"
            size="md"
            onClick={() => setIsSlideOverOpen(true)}
            label="Invite Customer"
            iconClass="ri-user-add-line"
          />
        </PageTitle>
        <CoreTable
          columns={CustomerColumns}
          data={data || []}
          emptyState={{
            title: 'No customers',
            description: 'Get started by inviting a customer',
            action: (
              <Button size="md" label="Invite Customer" onClick={() => setIsSlideOverOpen(true)} theme="primary" iconClass="ri-add-line" />
            )
          }}
        />
        <InviteCustomerUserSlideOver open={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
      </>
    </LoadingIndicator>
  )
}

Customers.requireAuth = true;