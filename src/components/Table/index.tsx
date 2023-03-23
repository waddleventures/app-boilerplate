import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EmptyState, { type EmptyStateProps } from "../EmptyState";

// TYPES
type Props = {
  data: unknown[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[],
  emptyState: EmptyStateProps,
}

export default function CoreTable({ data, columns, emptyState }: Props): JSX.Element {
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="shadow ring-1 ring-black ring-opacity-5"
    >
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-neutral-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {(!data || !data.length) && (
        <EmptyState {...emptyState} />
      )}
    </div>
  )
}