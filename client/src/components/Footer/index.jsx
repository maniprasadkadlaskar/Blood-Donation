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
            <div className='px-2 py-4 sm:flex justify-between'>
                <div>
                    <span>Blood Donation site is a site donate blood.</span>
                </div>
                <div className='px-2 py-4 flex space-x-12'>
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