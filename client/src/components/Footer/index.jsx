import { Link } from "react-router-dom";
import { Twitter , Instagram , Linkedin } from "react-bootstrap-icons";

const Footer = () => {

    const linkList = [
        {
            icon : <Twitter/>,
            url : "/"
        },
        {
            icon : <Instagram/>,
            url : "/"
        },
        {
            icon : <Linkedin/>,
            url : "/"
        }
    ]

    return (
        <div className='p-4 bg-gray-800 text-white'>
            <div className='p-2 text-xl'>
                <span>Blood Donation</span>
            </div>
            <div className='pl-2 pr-12 py-4 sm:flex justify-between'>
                <div>
                    <span>Blood Donation website serves as a resource hub, providing valuable information about the blood donation process, eligibility criteria, and the benefits of donating blood. 
                        We strive to educate and empower individuals to become blood donors, fostering a community united in compassion and solidarity.</span>
                </div>
                <div className='px-12 my-6 flex space-x-12'>
                    {linkList.map((link , index) => {
                        return(
                            <div className="text-xl" key={index}>
                            <Link to={link.url}>{link.icon}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='p-2'>
                &copy; 2023 Blood Donation.All rights are reserved.
            </div>
        </div>
    );
}

export default Footer;