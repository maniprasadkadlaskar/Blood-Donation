// import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import AuthContext from "./context";

const PrivateRoute = () => {

    // const { user } = useContext(AuthContext);

    return(
        <>
            {sessionStorage.getItem("user_email") ? <Outlet/> : <Navigate to="/signin" replace={true}/>}
        </>
    );
}

export default PrivateRoute;