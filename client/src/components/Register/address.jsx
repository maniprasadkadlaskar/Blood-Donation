const Address = ({ addressData , setAddressData }) => {

    const formItem = [
        {
            title: "Area",
            name: "area",
            type: "text",
            placeholder: "Enter Area"
        },
        {
            title: "City",
            name: "city",
            type: "text",
            placeholder: "Enter City"
        },
        {
            title: "Pincode",
            name: "pincode",
            type: "number",
            placeholder: "Enter pincode"
        },
        {
            title: "State",
            name: "state",
            type: "text",
            placeholder: "Enter state"
        },
        {
            title: "Country",
            name: "country",
            type: "text",
            placeholder: "Enter country"
        }
    ]

    const inputHandler = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
            <div className='text-2xl'>
                <span>Address Details</span>
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
                                value={addressData[item.name]}
                                pattern={item?.pattern}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Address;