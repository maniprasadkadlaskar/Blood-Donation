import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context";

const PrivateRoute = () => {

    const { user , setUser } = useContext(AuthContext);

    return(
        <>
            {user.token ? <Outlet/> : <Navigate to="/signin" replace={true}/>}
        </>
    );
}

export default PrivateRoute;