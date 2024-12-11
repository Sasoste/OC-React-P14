import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";

const Home = () => {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Create Employee</h1>
            <EmployeeForm />
        </div>
    );
};

export default Home;