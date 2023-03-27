import { api } from "../../utils/api";

export default function OrganizationLabel() {
  const { data: organization } = api.organization.getOne.useQuery();

  return (
    <div className="flex">
      <div
        className="text-gray-500 text-xs font-medium truncate h-5 w-5 bg-gray-200 rounded-sm flex justify-center items-center mr-2"
      >
        {organization?.name[0] || ''}
      </div>
      <div className="text-gray-900 text-sm font-medium truncate">{organization?.name || ''}</div>
    </div>
  )
}