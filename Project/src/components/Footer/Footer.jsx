import {Link} from "react-router-dom";
import bitcoin from "../../logo/bitcoin.png";

const columns = ["Hello kse, im footer"]

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white w-full mt-auto">
            <div className="py-5 px-2 lg:px-8 inline-block">
                <div className=" space-x-6 md:order-2 inline-block">
                </div>
                <div className="text-white text-sm inline-flex">
                    <Link to='/'>
                        <img
                            className="hidden h-10 w-auto lg:block"
                            src={bitcoin}
                        />
                    </Link>
                    {columns.map(item => (
                        <h2 className="ml-10 mt-2">{item}</h2>
                    ))}
                </div>
            </div>
        </footer>
    )
}