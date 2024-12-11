import React from "react";
import { Navbar } from "../Navbar/Navbar";

interface HeaderProps {
    logoSrc: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
    return (
        <header className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
                <Navbar />
            </div>
        </header>
    );
};

export default Header;