import { useState } from "react";
import Address from "../components/Register/address";
import Personal from "../components/Register/personal";
import api from "../config/api";
import { toast } from "react-toastify";

const Register = () => {

    const [personalData, setPersonalData] = useState({});
    const [addressData, setAddressData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        api.post("/register" , {
            email : sessionStorage.getItem("user_email"),
            personal : personalData,
            address : addressData
        }, {
            headers: { Authorization: localStorage.getItem("access_token") }
        })
        .then(res => {
            toast.success(res.data.message , {
                position : toast.POSITION.TOP_RIGHT
            });
            setPersonalData({});
            setAddressData({});
        })
        .catch(err => {
            toast.error(err.response.data.message , {
                position : toast.POSITION.TOP_RIGHT
            });
        })
    }

    return (
        <div className='p-2'>
            <div className='my-4 text-center text-3xl'>
                <span>Donor Registration</span>
            </div>
            <form className='m-1 px-10 py-4 bg-red-100 rounded-xl text-lg' onSubmit={submitHandler}>
                <Personal personalData={personalData} setPersonalData={setPersonalData} />
                <Address addressData={addressData} setAddressData={setAddressData} />
                <div className='text-center'>
                    <button
                        type='submit'
                        className='mt-4 p-2 w-64 text-white bg-red-600 rounded-md'
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
