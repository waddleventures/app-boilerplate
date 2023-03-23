import { createColumnHelper } from "@tanstack/react-table"

// COMPONENTS
import FormattedLink from "../../components/FormattedLink";

// CONSTANTS
import { EMPTY_TABLE_COL } from "../../constants/misc";

// TYPES
import type { NormalizedCustomerUser } from "../../types/normalizedCustomerUser.type";

const columnHelper = createColumnHelper<NormalizedCustomerUser>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    cell: info => info.getValue(),
    header: 'Email',
  }),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  columnHelper.accessor((row) => row.customer?.name || EMPTY_TABLE_COL, {
    id: 'customer',
    header: 'Organization',
  }),
  columnHelper.display({
    id: 'edit',
    cell: ({ row }) => {
      return <FormattedLink href={`/customers/${row.original.id}${row.original.isProto ? '?proto=true' : ''}`}>Edit</FormattedLink>
    }
  })
];

export default columns;