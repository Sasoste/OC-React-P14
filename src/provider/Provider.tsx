import React, { createContext, useContext, useState, ReactNode } from "react";

export type Employee = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    startDate: Date | null;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    department: string;
};

type EmployeeContextType = {
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    const addEmployee = (employee: Employee) => {
        setEmployees((prev) => [...prev, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error("useEmployees must be used within an EmployeeProvider");
    }
    return context;
};
