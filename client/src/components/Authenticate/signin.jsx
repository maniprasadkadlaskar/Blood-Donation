import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { toast } from 'react-toastify';

const SignIn = () => {

    const formEmpty = {
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(formEmpty);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        api.post("/signin" , formData)
        .then(res => {
            toast.success(res.data.message , {
                position : toast.POSITION.TOP_RIGHT
            })
            localStorage.setItem("access_token" , res.data.access_token);
            setFormData(formEmpty);
            navigate("/" , { replace:true })
        })
        .catch(err => {
            toast.error(err.response.data.message , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
    }

    return (
        <div>
            <div className='my-14 md:mx-96 py-14 text-center bg-red-100 text-lg rounded-xl'>
                <div className='m-2 text-2xl'>
                    <span>Sign In</span>
                </div>
                <form onSubmit={submitHandler}>
                    <div className='mt-4'>
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={inputHandler}
                            placeholder="Email"
                            className='w-80 p-2 rounded-md'
                        />
                    </div>
                    <div className='mt-4'>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={inputHandler}
                            placeholder="Password"
                            className='w-80 p-2 rounded-md'
                        />
                    </div>
                    <button
                        type='submit'
                        className='my-4 p-2 w-80 text-white bg-red-600 rounded-md'
                    >
                        Sign In
                    </button>
                    <div>
                        <span>Create new account ? </span>
                        <Link to="/signup">Click here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
