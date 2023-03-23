/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// UTILS
import { api } from "../../utils/api";

// COMPONENTS
import FormInput from "../../components/FormComponents/Form/input";
import SlideOver from "../../components/SlideOver";
import Button from "../../components/Buttons";

// TYPES
import type { SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
}

export default function InviteCustomerUser({ open, onClose }: Props): JSX.Element {
  // HOOKS
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onTouched' })

  // API
  const createMutation = api.customerUserProfile.inviteAndCreate.useMutation();

  // EVENT HANDLERS
  const onCreate: SubmitHandler<FormValues> = (data) => {
    createMutation.mutate(
      {
        name: data.name,
        email: data.email,
      },
      { 
        onSuccess: (res) => {
          void router.push(`/customers/${res.id}?proto=true`);
          toast.success('Successfully created the customer');
        }
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onCreate)}>
      <SlideOver
        open={open}
        onClose={onClose}
        header="New Customer"
        description="Start creating a new customer"
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
              submit={true}
              label="Save"
              size="md"
              disabled={!isValid}
            />
          </div>
        )}
      >
        <>
          <div>
            <FormInput
              type="text"
              placeholder="Name"
              label="Name"
              name="name"
              register={register}
              rules={{ required: 'Name is required' }}
              error={errors['name']?.message}
            />
          </div>
          <div>
            <FormInput
              type="email"
              placeholder="Email"
              label="Email"
              name="email"
              register={register}
              rules={{ required: 'Email is required' }}
              error={errors['email']?.message}
            />
          </div>
        </>
      </SlideOver>
    </form>
  )
}