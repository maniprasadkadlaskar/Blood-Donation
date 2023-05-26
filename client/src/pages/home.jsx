import AuthContext from "../config/context";
import { useContext, useEffect } from "react";
import api from "../config/api";

const Home = () => {

    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        api.get("/", {
            headers: { Authorization: localStorage.getItem("access_token") }
        })
            .then(res => {
                setUser({
                    token: res.data.access_token
                })
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