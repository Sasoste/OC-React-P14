import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { states, departments } from "@/data/data";
import Modal from "hrnet-modal-david";
import { useEmployees } from "@/provider/Provider";
import { Employee } from "@/provider/Provider";

const formSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    dateOfBirth: z.date(),
    startDate: z.date(),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(5, "Zip Code must be at least 5 characters"),
    department: z.string().min(1, "Department is required"),
});

const EmployeeForm: React.FC = () => {
    const { addEmployee } = useEmployees();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            startDate: null,
            street: "",
            city: "",
            state: "",
            zipCode: "",
            department: "",
        },
    });

    const onSubmit = (values: Employee) => {
        addEmployee(values)
        setIsModalOpen(true);
    };



    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <input className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-black" {...field} placeholder="John" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <input className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-black" {...field} placeholder="Doe" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date of Birth */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mr-2">Date of Birth</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        onChange={(date) => field.onChange(date)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Start Date */}
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mr-6">Start Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        onChange={(date) => field.onChange(date)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <fieldset className="border rounded-md p-4">
                        <legend className="text-sm font-semibold">Address</legend>
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <input className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-black" {...field} placeholder="123 Main St" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <input className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-black" {...field} placeholder="Springfield" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* State */}
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full text-left bg-white text-black">
                                                {field.value || "Select a state"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {states.map((state) => (
                                                <DropdownMenuItem key={state.abbreviation} onClick={() => field.onChange(state.name)}>
                                                    {state.name}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </fieldset>

                    {/* Zip Code */}
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <input className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-black" {...field} placeholder="12345" type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Department */}
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full text-left bg-white text-black">
                                            {field.value || "Select a department"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {departments.map((department) => (
                                            <DropdownMenuItem key={department} onClick={() => field.onChange(department)}>
                                                {department}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Save Button */}
                    <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800 flex justify-self-center">
                        Save Employee
                    </Button>
                </form>
            </Form>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                text="Employee correctly created"
                fadeDuration={300}
                textStyle={{ fontSize: "18px", textAlign: "center" }}
                closeOnOverlayClick={true}
                closeOnEscape={true}
                showCloseButton={true}
                closeButtonClass="test"
                closeButtonText="test"
                closeButtonPosition="top-right"
                className="test"
                overlayClassName="test2"
                border="3px solid #ccc"
                boxShadow="10px 5px 5px red"
            />
        </>
    );
};

export default EmployeeForm;
