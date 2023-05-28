import { NavLink } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import { useState } from "react";

const Sidebar = () => {

    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => {
        menuState ? setMenuState(false) : setMenuState(true);
    }

    const options = [
        {
            name: "About",
            path: "/dashboard"
        },
        {
            name: "Registrations",
            path: "/dashboard/registrations"
        },
        {
            name: "Edit details",
            path: "/dashboard/edit"
        }
    ]

    return (
        <>
            <div className="px-2 py-4 bg-red-100 text-lg text-center sm:block hidden">
                <div className='text-2xl'>
                    <span>Dashboard</span>
                </div>
                <div className="w-44 py-2 grid">
                    {options.map((option, index) => {
                        return (
                            <NavLink to={option.path} className="my-1 p-2 bg-red-500 text-white rounded-lg" key={index}>
                                {option.name}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            <div className="w-full h-full flex sm:hidden absolute">
                {menuState && <div className="px-2 py-4 bg-red-100 text-lg text-center rounded-lg">
                    <div className='text-2xl'>
                        <span>Dashboard</span>
                    </div>
                    <div 
                        className="w-44 py-2 grid"
                        onClick={toggleMenu}
                    >
                        {options.map((option, index) => {
                            return (
                                <NavLink to={option.path} className="my-1 p-2 bg-red-500 text-white rounded-lg" key={index}>
                                    {option.name}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>}
                <List 
                    className="mt-4 p-3 bg-red-100 text-5xl rounded-r-md" 
                    onClick={toggleMenu}
                />
            </div>
        </>
    );
}

export default Sidebar;