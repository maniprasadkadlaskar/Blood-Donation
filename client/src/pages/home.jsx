import AuthContext from "../config/context";
import { useContext, useEffect } from "react";
import api from "../config/api";
import CountUp from 'react-countup';
import { useState } from "react";

const Home = () => {

    const images = [
        {
            path: "assets/image1.jpg"
        },
        {
            path: "assets/image2.jpg"
        },
        {
            path: "assets/image3.jpg"
        },
        {
            path: "assets/image4.jpg"
        },
        {
            path: "assets/image5.jpg"
        },
        {
            path: "assets/image6.jpg"
        }
    ]

    const { setAuth } = useContext(AuthContext);
    const [registrations , setRegistrations] = useState(0);

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
                        <span>Registrations</span>
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
                <div className="m-4 text-xl font-bold">
                    <span>Images</span>
                </div>
                <div className="my-8 m-8 grid sm:grid-cols-2 gap-x-12 gap-y-12">
                    {images.map((image, index) => {
                        return (
                            <img
                                src={image.path}
                                className="w-full h-72 rounded-xl"
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