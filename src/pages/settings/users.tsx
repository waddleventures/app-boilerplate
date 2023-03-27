import { useState } from "react";

// COMPONENTS
import { AvatarWithName } from "../../components/Avatar";
import Button from "../../components/Buttons";
import List from "../../components/List";
import PageLoadingIndicator from "../../components/PageLoadingIndicator";
import PageTitle from "../../components/PageTitle";
import Panel from "../../components/Panel";
import Pill from "../../components/Pill";
import InviteUserSlideOver from "../../pageComponents/SlideOvers/inviteUser";

// UTILS
import { api } from "../../utils/api"
import { useBreadcrumbs } from "../../components/Breadcrumbs";

// TYPES
import type { User } from "@prisma/client";

const UserImageColumn = ({ user }: { user: User }) => (
  <div className="flex-shrink-0">
    {(user.image && user.image !== "") && (
      <img
        className="h-12 w-12 rounded-full"
        src={user.image}
        alt=""
      />
    )}
    {!user.image && (
      <AvatarWithName name={user.name as string} size="sm" />
    )}
  </div>
)

const UserDetailsColumn = ({ user }: { user: User }) => (
  <div>
    <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
    <p className="flex items-center text-sm text-gray-500">
      <i className="ri-mail-line text-gray-400 text-md mr-2"></i>
      <span className="truncate">{user.email}</span>
    </p>
  </div>
) 

const UserRoleColumn = ({ user }: { user: User }) => (
  <Pill
    text={`${user.role.charAt(0)}${user.role.slice(1).toLowerCase()}`}
  />
)

export default function UsersPage() {
  // BREADCRUMBS
  useBreadcrumbs([{ name: 'Users', href: '/settings/users' }])

  // API
  const { data, isLoading } = api.user.getAll.useQuery();

  // STATE
  const [isSlideOverOpen, setIsSlideOverOpen] = useState<boolean>(false);

  return (
    <PageLoadingIndicator loading={isLoading}>
      <>
        <PageTitle
          title="Users"
        >
          <Button
            theme="primary"
            size="md"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => setIsSlideOverOpen(true)}
            label="Add User"
            iconClass="ri-user-add-line"
          />
        </PageTitle>
        <List
          items={(data || []).map((user) => ({
            actionType: 'href',
            href: `/settings/account/${user.id}`,
            key: user.id,
            columns: [
              <div key={`${user.id}-details`} className="flex space-x-4 items-center">
                <UserImageColumn user={user} />
                <UserDetailsColumn user={user} />
              </div>,
              <UserRoleColumn user={user} key={`${user.id}-role`} />
            ],
          }))}
        />
        <InviteUserSlideOver open={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
      </>
    </PageLoadingIndicator>
  )
}

UsersPage.requireAuth = true;