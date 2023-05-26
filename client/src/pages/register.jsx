import { useState  , useContext } from "react";
import Address from "../components/Register/address";
import Personal from "../components/Register/personal";
import api from "../config/api";
import AuthContext from "../config/context";
import { toast } from "react-toastify";

const Register = () => {

    const { user } = useContext(AuthContext);

    const emptyPersonal = {
        firstname: "",
        lastname: "",
        dob: "",
        gender: "",
        bg: "",
        weight: "",
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
        api.post("/register" , {
            email : user.token.email,
            personal : personalData,
            address : addressData
        })
        .then(res => {
            toast.success(res.data.message , {
                position : toast.POSITION.TOP_RIGHT
            });
            setPersonalData(emptyPersonal);
            setAddressData(emptyAddress);
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
