import { useState } from 'react';
import { Link  , useNavigate } from 'react-router-dom';
import api from '../../config/api';

const SignUp = () => {

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
        api.post("/signup" , formData)
        .then(res => {
            console.log(res.data.message);
            setFormData(formEmpty);
            navigate("/signin" , { replace:true });
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
    }

    return (
        <div>
            <div className='my-14 md:mx-96 py-14 text-center bg-red-100 text-lg rounded-xl'>
                <div className='m-2 text-2xl'>
                    <span>Sign Up</span>
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
                        Sign Up
                    </button>
                    <div>
                        <span>Already have account ? </span>
                        <Link to="/signin">Click here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
