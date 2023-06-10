import AuthContext from "../config/context";
import { useContext, useEffect } from "react";
import api from "../config/api";
import CountUp from 'react-countup';
import Image1 from "../assets/image1.jpg";
import Image2 from "../assets/image2.jpg";
import Image3 from "../assets/image3.jpg";
import Image4 from "../assets/image4.jpg";
import Image5 from "../assets/image5.jpg";
import Image6 from "../assets/image6.jpg";
import { useState } from "react";

const Home = () => {

    const { setAuth } = useContext(AuthContext);
    const [registrations , setRegistrations] = useState(0);
    const images = [Image1, Image2, Image3, Image4, Image5, Image6]

    useEffect(() => {
        api.get("/registrations")
            .then(res => {
                setRegistrations(res.data.registrations);
            })
            .catch(err => {
                console.log(err.message);
            })


        api.get("/", {
            headers: { Authorization: localStorage.getItem("access_token") }
        })
            .then(res => {
                setAuth({
                    token: res.data.access_token,
                    isRegistered: res.data.access_token.isRegistered
                })
                sessionStorage.setItem("user_email", res.data.access_token.email);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <div>
            <div>
                <div className="px-12 py-32 text-3xl text-white font-bold bg-red-600">
                    <span>Blood donation<br />A simple act of kindness that has the power to change lives.</span>
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
                        <CountUp
                            start={0}
                            end={registrations}
                            duration={2}
                        />
                    </div>
                </div>
            </div>
            <div className="m-4 text-center">
                <div className="m-2 text-xl font-bold">
                    <span>Images</span>
                </div>
                <div className="m-8 grid sm:grid-cols-3">
                    {images.map((url, index) => {
                        return (
                            <img
                                src={url}
                                className="m-4 w-96 h-64 rounded-xl"
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;