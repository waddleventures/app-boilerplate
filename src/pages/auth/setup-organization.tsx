/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

// COMPONENTS
import { Avatar } from "../../components/Avatar";
import Button from "../../components/Buttons";
import Input from "../../components/FormComponents/Form/input";
import StandaloneInput from '../../components/FormComponents/Standalone/Input';
import List from "../../components/List";
import Logo from "../../components/Logo";
import PageLoadingIndicator from "../../components/PageLoadingIndicator";

// UTILS
import { api } from "../../utils/api";

// TYPES
import type { SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
}

export default function SetupOrganizationPage() {
  // HOOKS, API, FORM
  const router = useRouter();
  const createOrganizationMutation = api.organization.finalizeSignUpNewOrganization.useMutation();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>(
    {
      mode: 'onTouched',
      resetOptions: {
        keepDirtyValues: true,
      }
    }
  );

  // STATE
  const [invitees, setInvitees] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');

  // EVENT HANDLERS
  const onAddTeamMember = () => {
    // Add current email to state array
    setInvitees([...invitees, currentEmail]);
    // Clear current email
    setCurrentEmail('');
  }

  const onRemoveTeamMember = (idx: number) => {
    setInvitees([...invitees.slice(0, idx), ...invitees.slice(idx + 1)]);
  }

  const onSaveAndCreate: SubmitHandler<FormValues> = async (data) => {
    await createOrganizationMutation.mutateAsync(
      { organizationName: data.name, invitationEmails: invitees, },
      { onSuccess: () => void router.push('/') }
    )
  }

  return (
    <div className="h-screen w-screen bg-neutral-50">
      <div className="mx-auto flex flex-col max-w-3xl px-8 py-6 bg-white h-screen shadow-sm border-l border-r border-neutral-200">
        <PageLoadingIndicator loading={createOrganizationMutation.isLoading}>
          <form onSubmit={handleSubmit(onSaveAndCreate)}>
            <Logo.Regular />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Welcome to &lt;Product Name&gt;
            </h2>
            <div className="mt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Configure your new organization
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Let&apos;s get started by configuring your new organization.
              </p>
            </div>
            <div className="mt-6">
              <Input
                label="Organization Name"
                type="text"
                placeholder="Organization Name"
                name="name"
                register={register}
                rules={{ required: 'A name for your organization is required' }}
                error={errors['name']?.message}
              />
            </div>
            <div className="mt-6">
              <StandaloneInput
                label="Invite Team Members"
                type="email"
                value={currentEmail}
                onChange={(val: string) => setCurrentEmail(val)}
                placeholder="Enter your team members' emails"
              >
                <Button
                  size="md"
                  theme="secondary"
                  iconClass="ri-add-line"
                  label="Add"
                  onClick={onAddTeamMember}
                />
              </StandaloneInput>
              <List
                className="mt-2"
                items={invitees.map((email, idx) => ({
                  key: `${email}-${idx}`,
                  actionType: 'none',
                  columns: [
                    <div key={`${email}-col1`} className="flex items-center">
                      <Avatar initials={<i className="ri-user-fill text-sm" />} size="sm" />
                      <span className="ml-4 text-sm">{email}</span>
                    </div>,
                    <div key={`${email}-col2`}>
                      <Button size="sm" theme="danger" label="" iconClass="ri-delete-bin-fill" onClick={() => onRemoveTeamMember(idx)}/>
                    </div>
                  ]
                }))}
              />
            </div>
            <div className="mt-auto ml-auto">
              <Button
                size="md"
                theme="primary"
                iconClass="ri-check-line"
                label="Save and get started"
                submit
                disabled={!isValid}
              />
            </div>
          </form>
        </PageLoadingIndicator>
      </div>
    </div>
  )
}