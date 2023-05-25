import { useState } from "react";
import Address from "../components/Register/address";
import Personal from "../components/Register/personal";

const Register = () => {

    const emptyPersonal = {
        firstname: "",
        lastname: "",
        dob: "",
        bg: "",
        weight: "",
        height: "",
        mobile: ""
    }

    const emptyAddress = {
        area: "",
        city: "",
        pincode: "",
        country: ""
    }

    const [personalData, setPersonalData] = useState(emptyPersonal);
    const [addressData, setAddressData] = useState(emptyAddress);

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(personalData);
        console.log(addressData);
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
