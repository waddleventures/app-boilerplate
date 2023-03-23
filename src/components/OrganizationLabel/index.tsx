import { api } from "../../utils/api";

export default function OrganizationLabel() {
  const { data: organization } = api.organization.getOne.useQuery();

  const noOfUsers = organization?.users.length || 0;
  return (
    <div>
      <div className="text-gray-900 text-sm font-medium truncate">{organization?.name || ''}</div>
      <div className="text-xs text-gray-400 leading-3">{`${noOfUsers} ${noOfUsers !== 1 ? 'users' : 'user'}`}</div>
    </div>
  )
}