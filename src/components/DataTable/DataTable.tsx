import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { useEmployees } from "@/provider/Provider";
import { useState, useMemo } from "react";

interface DataTableProps<TData> {
    columns: ColumnDef<TData, unknown>[];
}

export function DataTable<TData>({ columns }: DataTableProps<TData>) {
    const memoizedColumns = useMemo(() => columns, [columns]);
    const { employees } = useEmployees();
    const memoizedData = useMemo(() => employees as TData[], [employees]);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
    });

    return (
        <div className="rounded-md border overflow-hidden">
            <div className="p-4 bg-gray-100 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        value={(table.getColumn("firstName")?.getFilterValue() as string) || ""}
                        onChange={(e) => table.getColumn("firstName")?.setFilterValue(e.target.value)}
                        placeholder="Filtrer par prénom..."
                        className="border p-2 rounded bg-white w-48"
                    />
                    <input
                        type="text"
                        value={(table.getColumn("lastName")?.getFilterValue() as string) || ""}
                        onChange={(e) => table.getColumn("lastName")?.setFilterValue(e.target.value)}
                        placeholder="Filtrer par nom..."
                        className="border p-2 rounded bg-white w-48"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed"
                    >
                        Précédent
                    </button>

                    <span>
                        <strong>{table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}</strong>
                    </span>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed"
                    >
                        Suivant
                    </button>

                    <span>Aller à la page:</span>
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16 bg-white"
                    />
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="border p-1 rounded bg-white"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="flex items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center p-4">
                                Aucun employé trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

