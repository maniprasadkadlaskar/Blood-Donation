import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../config/context";
import { List, X } from "react-bootstrap-icons";

const Navbar = () => {

    const user = useContext(AuthContext);
    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => {
        menuState ? setMenuState(false) : setMenuState(true);
    }

    const navList = [
        {
            name: "Register",
            path: "/register"
        },
        {
            name: "Donate",
            path: "/donate"
        },
        {
            name: user.email,
            path: "/dashboard"
        }
    ]

    return (
        <div className="p-4 bg-red-600 text-white">
            <div className='flex justify-between'>
                <div className='text-xl'>
                    <span>Blood Donation</span>
                </div>
                <div className='sm:block space-x-4 hidden'>
                    <Link to="/home">Home</Link>
                    {user.token ? navList.map((item, index) => {
                        return (
                            <Link
                                to={item.path}
                                key={index}
                            >
                                {item.name}
                            </Link>
                        )
                    }) : <Link to="/signin">Sign In</Link>}
                    {user.token && <Link>Logout</Link>}
                </div>
                {menuState ? <X className="text-2xl sm:hidden" onClick={toggleMenu} /> : <List className="text-2xl sm:hidden" onClick={toggleMenu} />}
            </div>
            
            {menuState && <div className='text-center sm:hidden'>
                <div className="p-2">
                    <Link to="/home" onClick={toggleMenu}>Home</Link>
                </div>
                {user.token ? navList.map((item, index) => {
                    return (
                        <div className="p-2" key={index}>
                            <Link
                                to={item.path}
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </Link>
                        </div>
                    )
                }) :
                    <div className="p-2" onClick={toggleMenu}>
                        <Link to="/signin">Sign In</Link>
                    </div>
                }
                {user.token && <div className="p-2">
                    <Link onClick={toggleMenu} >Logout</Link>
                </div>}
            </div>}
        </div>
    );
}

export default Navbar;