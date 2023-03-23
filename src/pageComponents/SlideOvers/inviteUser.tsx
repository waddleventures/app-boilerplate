/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

// UTILS
import { api } from "../../utils/api";

// COMPONENTS
import Input from "../../components/FormComponents/Form/input";
import LuxuriousRadioGroup from "../../components/FormComponents/Form/luxuriousRadioGroup";
import SlideOver from "../../components/SlideOver";
import Button from "../../components/Buttons";

// TYPES
import type { SubmitHandler } from "react-hook-form";
import { Role } from "@prisma/client";

type FormValues = {
  name: string;
  email: string;
  role: Role;
}

type Props = {
  open: boolean;
  onClose: () => void;
}

export default function InviteUserSlideOver({ open, onClose }: Props): JSX.Element {
  // API & HOOKS
  const { data: session } = useSession();
  const apiContext = api.useContext();
  const createMutation = api.invitation.create.useMutation();
  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>(
    {
      mode: 'onTouched',
      defaultValues: { role: Role.USER },
      resetOptions: {
        keepDirtyValues: true,
      }
    }
  );

  // EVENT HANDLERS
  const onCreate: SubmitHandler<FormValues> = (data) => {
    createMutation.mutate(
      { name: data.name, email: data.email, role: data.role as 'USER' | 'ADMIN', },
      { onSuccess: () => {
        void apiContext.invitation.getAll.refetch();
        toast.success('Successfully invited the new user');
        onClose();
      }},
    );
  }

  return (
    <form onSubmit={handleSubmit(onCreate)}>
      <SlideOver
        open={open}
        onClose={onClose}
        header="Invite User"
        description="Invite a new user to start using the app"
        footer={(
          <div className="space-x-4">
            <Button
              theme="secondary"
              onClick={onClose}
              label="Cancel"
              size="md"
            />
            <Button
              theme="primary"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              submit
              label="Save"
              size="md"
              disabled={!isValid}
            />
          </div>
        )}
      >
        <>
          <div>
            <Input
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              register={register}
              rules={{ required: 'Name is required' }}
              error={errors['name']?.message}
            />
          </div>
          <div>
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              register={register}
              rules={{ required: 'Email is required' }}
              error={errors['email']?.message}
            />
          </div>
          <div>
            <LuxuriousRadioGroup
              label="Role"
              name="role"
              register={register}
              rules={{}}
              control={control}
              options={[
                { value: Role.USER, label: 'User', description: 'Basic permissions' },
                { value: Role.ADMIN, label: 'Admin', description: 'Elevated permissions', disabled: session?.user?.role !== Role.ADMIN },
              ]}
            />
          </div>
        </>
      </SlideOver>
    </form>
  )
}