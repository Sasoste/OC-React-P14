import { DataTable } from "@/components/DataTable/DataTable";

const columns = [
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
            <DataTable columns={columns} />
        </div>
    );
};

export default CurrentEmployee;
