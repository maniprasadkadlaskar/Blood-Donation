import AuthContext from "../config/context";
import { useContext, useEffect } from "react";
import api from "../config/api";

const Home = () => {

    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        api.get("/", {
            headers: { Authorization: localStorage.getItem("access_token") }
        })
            .then(res => {
                setUser({
                    token: res.data.access_token
                })
                sessionStorage.setItem("user_email" , res.data.access_token.email);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <div>
            Home page
        </div>
    );
}

export default Home;