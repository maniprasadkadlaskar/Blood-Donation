const Personal = ({ personalData , setPersonalData }) => {

    const formItem = [
        {
            title: "Firstname",
            name: "firstname",
            type: "text",
            placeholder: "Enter Firstname"
        },
        {
            title: "Lastname",
            name: "lastname",
            type: "text",
            placeholder: "Enter Lastname"
        },
        {
            title: "Date of birth",
            name: "dob",
            type: "date",
        },
        {
            title: "Gender",
            name: "gender",
            type: "text",
            placeholder: "Male / Female / Other"
        },
        {
            title: "Blood group",
            name: "bg",
            type: "text",
            placeholder: "Blood group O / A ..."
        },
        {
            title: "Weight",
            name: "weight",
            type: "number",
            placeholder: "Enter weight in kg"
        },
        {
            title: "Mobile number",
            name: "mobile",
            type: "tel",
            pattern: "[0-9]{10}",
            placeholder: "Enter number"
        }
    ]

    const inputHandler = (e) => {
        setPersonalData({
            ...personalData,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
            <div className='text-2xl'>
                <span>Personal Details</span>
            </div>
            <div className='my-2 grid md:grid-cols-3 sm:grid-cols-1'>
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
                                value={personalData[item.name]}
                                pattern={item?.pattern}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Personal;