/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router"
import { type SubmitHandler, useForm } from "react-hook-form";

// COMPONENTS
import LoadingIndicator from "../../components/PageLoadingIndicator";
import PageTitle from "../../components/PageTitle";
import StandaloneInput from '../../components/FormComponents/Standalone/Input';
import Input from "../../components/FormComponents/Form/input";
import Panel from "../../components/Panel";
import Button from "../../components/Buttons";

// UTILS
import { api } from "../../utils/api";
import { useBreadcrumbs } from "../../components/Breadcrumbs";
import toast from "react-hot-toast";
import Select, { SelectValue } from "../../components/FormComponents/Standalone/Select";
import Label from "../../components/FormComponents/Label";
import { useState } from "react";
import { Customer } from "@prisma/client";

// TYPES
type FormValues = {
  name: string;
}

export default function AmbassadorId(): JSX.Element {
  // HOOKS
  const router = useRouter();

  // API
  const { data: customerOrganizations } = api.customer.getAll.useQuery();
  const { data: customer, isLoading } = api.customerUserProfile.getOne.useQuery((router.query.proto ? { protoId: router.query.id as string } : { userId: router.query.id as string }));
  const updateCustomerUserProfileMutation = api.customerUserProfile.patch.useMutation();
  const createCustomerOrganizationMutation = api.customer.create.useMutation();
  const apiContext = api.useContext();

  // FORMS
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>(
    {
      mode: 'onTouched',
      values: { name: customer?.name || '' },
      resetOptions: {
        keepDirtyValues: true,
      }
    }
  );

  // STATE
  const [customerOrganization, setCustomerOrganization] = useState<Required<{ id: string, name: string }> | Customer | null | undefined>(customer?.customer);

  // BREADCRUMBS
  useBreadcrumbs([{ name: 'Customers', href: '/customers' }, { name: `${customer?.name || ''}`, href: router.asPath }])

  // EVENT HANDLERS
  const onSave: SubmitHandler<FormValues> = (data) => {
    updateCustomerUserProfileMutation.mutate(
      { 
        query: router.query.proto ? { protoId: router.query.id as string } : { userId: router.query.id as string }, 
        body: { 
          name: data.name,
          customerId: customerOrganization?.id || undefined,
        } 
      },
      {
        onSuccess: () => {
          void apiContext.customerUserProfile.getOne.refetch();
          toast.success('Successfully updated the customer');
        }
      }
    )
  }

  const onChangeCustomer = async (customerProto: SelectValue) => {
    // If no id; createAndAssign
    if (!customerProto.id) {
      const customer = await createCustomerOrganizationMutation.mutateAsync({ name: customerProto.label });
      setCustomerOrganization(customer)
    } else {
      setCustomerOrganization({ id: customerProto.id, name: customerProto.label });
    }
  }

  return (
    <LoadingIndicator loading={!customer || isLoading}>
      <>
        <PageTitle title={customer?.name || ''} />
        <Panel
          title="Profile"
        >
          <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <Input
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              register={register}
              rules={{ required: 'Name is required' }}
              error={errors['name']?.message}
            />
            <StandaloneInput
              type="email"
              label="Email"
              placeholder="Email"
              value={customer?.email || ''}
              disabled={true}
            />
            <div>
              <Label label='Customer' />
              <Select
                values={customerOrganizations?.map((el) => ({ id: el.id, label: el.name }))}
                value={customerOrganization ? { id: customerOrganization.id, label: customerOrganization.name } : null}
                allowCreate={true}
                placeholder="Type to search or create a customer organization..."
                onChange={onChangeCustomer}
              />
            </div>
            <div className="flex justify-between">
              <Button
                theme="primary"
                label="Save"
                iconClass="ri-check-line"
                submit
                size="md"
                disabled={!isValid}
              />
            </div>
          </form>
        </Panel>
      </>
    </LoadingIndicator>
  );
}

AmbassadorId.requireAuth = true;