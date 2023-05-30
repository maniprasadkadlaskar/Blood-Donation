import AuthContext from "../config/context";
import { useContext, useEffect } from "react";
import api from "../config/api";
import Background from "../assets/background.jpg";

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
                sessionStorage.setItem("user_email", res.data.access_token.email);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <div>
            <div className="">
                <div>
                    <img 
                        src={Background}
                        className="w-full h-96 brightness-50"
                    />
                </div>
                <div className="top-24 inset-x-5 p-8 text-3xl text-white font-bold bg-red-600 rounded-xl bg-opacity-80 absolute">
                    <span>Blood donation<br/>A simple act of kindness that has the power to change lives.</span>
                </div>
            </div>
            <div className="m-4 grid sm:grid-cols-2">
                <div className="m-2 text-center">
                    <div className="m-2 text-xl font-bold">
                        <span>About</span>
                    </div>
                    <div className="m-2 text-md">
                        Blood donation is a remarkable act that has the power to save lives and make a lasting impact on individuals and communities.
                        By generously giving a pint of blood, donors become true heroes, offering hope and a lifeline to those in need.
                        Regardless of who we are or where we come from, the act of donating blood unites us, highlighting our shared humanity and the positive change we can create together.
                        Join us in making a difference by donating blood today.
                    </div>
                </div>
                <div className="m-2 text-center">
                    <div className="m-2 text-xl font-bold">
                        <span>Registered users</span>
                    </div>
                    <div className="mx-24 my-4 px-2 py-12 rounded-xl text-6xl font-bold bg-yellow-400">
                        <span>45</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;