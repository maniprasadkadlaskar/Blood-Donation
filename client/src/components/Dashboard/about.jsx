import { useState , useEffect } from "react";
import api from "../../config/api";

const About = () => {
    const [personal , setPersonal] = useState({});
    const [address , setAddress] = useState({});

    useEffect(() => {
        api.get(`/user?email=${sessionStorage.getItem("user_email")}` , {
            headers: { Authorization: localStorage.getItem("access_token") }
        })
        .then(res => {
            console.log(res.data.message);
            setPersonal(res.data.user.personal);
            setAddress(res.data.user.address);
        })
        .catch(err => {
            console.log(err.message);
        })
    } , [])

    const personalList = [
        {
            name: "Firstname",
            value: personal.firstname
        },
        {
            name: "Lastname",
            value: personal.lastname
        },
        {
            name: "Date of birth",
            value: personal.dob
        },
        {
            name: "Gender",
            value: personal.gender
        },
        {
            name: "Blood group",
            value: personal.bg
        },
        {
            name: "Weight (Kg)",
            value: personal.weight
        },
        {
            name: "Mobile number",
            value: personal.mobile
        }
    ]

    const addressList = [
        {
            name: "Area",
            value: address.area
        },
        {
            name: "City",
            value: address.city
        },
        {
            name: "Pincode",
            value: address.pincode
        },
        {
            name: "State",
            value: address.state
        },
        {
            name: "Country",
            value: address.country
        }
    ]

    return (
        <div className="m-2 w-full">
            <div className='my-4 text-center text-3xl'>
                <span>Donor Information</span>
            </div>
            <div className="m-1 px-10 py-4 bg-red-100 rounded-xl text-lg">
                <div className='text-2xl'>
                    <span>Personal Details</span>
                </div>
                <div className="m-4">
                    {personalList.map((item, index) => {
                        return (
                            <div className="m-1 space-x-4" key={index}>
                                <span>{item.name}</span>
                                <span className="text-gray-500">{item.value}</span>
                            </div>
                        );
                    })}
                </div>
                <div className='text-2xl'>
                    <span>Address Details</span>
                </div>
                <div className="m-4">
                    {addressList.map((item, index) => {
                        return (
                            <div className="m-1 space-x-4" key={index}>
                                <span>{item.name}</span>
                                <span className="text-gray-500">{item.value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default About;