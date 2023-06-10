import { useState } from "react";
import api from "../config/api";
import { toast } from "react-toastify";

const Donate = () => {
    const emptyForm = {
        city: "",
        date: ""
    }

    const formItem = [
        {
            title: "City",
            name: "city",
            type: "text",
            placeholder: "Enter City"
        },
        {
            title: "Date",
            name: "date",
            type: "date",
        }
    ]

    const [formData , setFormData] = useState(emptyForm);

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        api.post("/donate" , {
            ...formData,
            email : sessionStorage.getItem("user_email")
        } ,{
            headers: { Authorization: localStorage.getItem("access_token") }
        })
        .then(res => {
            toast.success(res.data.message , {
                position : toast.POSITION.TOP_RIGHT
            });
            setFormData(emptyForm);
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
                <span>Donation Registration</span>
            </div>
            <form className='my-20 md:mx-96 py-14 text-center bg-red-100 text-lg rounded-xl' onSubmit={submitHandler}>
                <div className='my-4 grid md:grid-cols-2'>
                    {formItem.map((item, index) => {
                        return (
                            <div
                                className='m-2'
                                key={index}
                            >
                                <label htmlFor={item.name}>{item.title}</label>
                                <input
                                    type={item.type}
                                    id={item.name}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className='ml-4 p-1 w-64 rounded-md'
                                    required
                                    onChange={inputHandler}
                                    value={formData[item.name]}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className='text-center'>
                    <button
                        type='submit'
                        className='mt-4 p-2 w-72 text-white bg-red-600 rounded-md'
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Donate;