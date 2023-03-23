/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// COMPONENTS
import Button from "../../../components/Buttons";
import PageLoadingIndicator from "../../../components/PageLoadingIndicator";
import PageTitle from "../../../components/PageTitle";
import Panel from "../../../components/Panel";
import Input from "../../../components/FormComponents/Form/input";
import StandaloneInput from '../../../components/FormComponents/Standalone/Input';
import LuxuriousRadioGroup from "../../../components/FormComponents/Form/luxuriousRadioGroup";

// UTILS
import { api } from "../../../utils/api";
import { useBreadcrumbs } from "../../../components/Breadcrumbs";
import usePermission from "../../../utils/usePermission";

// TYPES
import { Role } from "@prisma/client";
import type { SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  role: Role;
}
export default function AccountPage() {
  // HOOKS
  const router = useRouter();
  const { data: session } = useSession();

  // API
  const { data: user, isLoading } = api.user.getOne.useQuery(
    { id: router.query.id as string },
    { refetchOnMount: true, refetchOnReconnect: true, refetchOnWindowFocus: false },
  );
  const updateUserMutation = api.user.patch.useMutation();
  const apiContext = api.useContext();
  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>(
    {
      mode: 'onTouched',
      defaultValues: { role: 'USER' },
      values: { name: user?.name || '', role: user?.role || 'USER' },
      resetOptions: {
        keepDirtyValues: true,
      }
    }
  );

  // BREADCRUMBS
  useBreadcrumbs([{ name: `Team Member ${user?.name || ''}`, href: `/settings/account/${router.query.id as string}` }])

  // PERMISSIONS
  const hasPermission = usePermission(Role.ADMIN, router.query.id === session?.user?.id);

  // EVENT HANDLERS
  const onSave: SubmitHandler<FormValues> = (data) => {
    updateUserMutation.mutate(
      { query: { id: router.query.id as string }, body: { name: data.name, role: data.role as ('USER' | 'ADMIN') } },
      {
        onSuccess: () => {
          void apiContext.user.getOne.refetch();
          toast.success('Successfully updated the user');
        }
      }
    )
  }

  return (
    <PageLoadingIndicator loading={isLoading}>
      <>
        <PageTitle title="Account" />
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
              disabled={!hasPermission}
            />
            <StandaloneInput
              type="email"
              label="Email"
              placeholder="Email"
              value={user?.email || ''}
              disabled={true}
            />
            <LuxuriousRadioGroup
              label="Role"
              name="role"
              register={register}
              rules={{}}
              control={control}
              options={[
                { value: Role.USER, label: 'User', description: 'Basic permissions' },
                { value: Role.ADMIN, label: 'Admin', description: 'Elevated permissions', disabled: user?.role !== Role.ADMIN },
              ]}
              disabled={!hasPermission}
            />
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
    </PageLoadingIndicator>
  )
}

AccountPage.requireAuth = true;