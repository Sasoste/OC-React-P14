import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-white hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/employees" className="text-white hover:underline">
                        Current Employees
                    </Link>
                </li>
            </ul>
        </nav>
    );
};