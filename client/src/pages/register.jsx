import { useState , useContext } from "react";
import Address from "../components/Register/address";
import Personal from "../components/Register/personal";
import api from "../config/api";
import { toast } from "react-toastify";
import AuthContext from "../config/context";
import { useNavigate } from "react-router-dom";

const Register = () => {

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
        state: "",
        country: ""
    }

    const [personalData, setPersonalData] = useState(emptyPersonal);
    const [addressData, setAddressData] = useState(emptyAddress);
    const { auth , setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

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
            setPersonalData(emptyPersonal);
            setAddressData(emptyAddress);
            setAuth({
                ...auth,
                isRegistered : true
            })
            navigate("/donate" , { replace:true })
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
