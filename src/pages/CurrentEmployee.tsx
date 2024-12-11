import { DataTable } from "@/components/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";


const employees = [
    {
        firstName: "John",
        lastName: "Doe",
        department: "Engineering",
        startDate: "2023-01-15",
        dateOfBirth: "1990-05-20",
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: "62701",
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        department: "Marketing",
        startDate: "2022-11-10",
        dateOfBirth: "1985-09-12",
        street: "456 Elm St",
        city: "Shelbyville",
        state: "IN",
        zipCode: "46176",
    },
];

const columns: ColumnDef<typeof employees[0]>[] = [
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
    },
    {
        accessorKey: "street",
        header: "Street",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "zipCode",
        header: "Zip Code",
    },
];

const CurrentEmployee = () => {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Current Employees</h1>
            <DataTable columns={columns} data={employees} />
        </div>
    );
};

export default CurrentEmployee;
