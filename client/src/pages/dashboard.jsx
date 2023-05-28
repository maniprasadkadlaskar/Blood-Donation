// import Registration from "../components/Dashboard/registration";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/sidebar";
// import Register from "./register";

const Dashboard = () => {

    return (
        <div className="min-h-screen flex">
            <Sidebar/>
            {/* <Registration/> */}
            {/* <Register /> */}
            <Outlet/>
        </div>
    );
}

export default Dashboard;