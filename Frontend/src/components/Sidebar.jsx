import { Link } from "react-router-dom";


function Sidebar() {

    return (
        <>
            <div className="w-56 bg-gray-900 p-4 fixed top-0 left-0 h-full">
                <div className="flex items-center mb-6 bg-gray-600 p-2">
                    <Link to={"/"}>
                    <img
                        alt="Logo"
                        className="mr-2"
                        height={40}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVre4yMyRbK8Zc3E0DbJ1FIuWL2Nx0P3sVVW2taXJIFACoIOnZLIrBorTSFNML5kfRkIc&usqp=CAU"
                        width={40}
                    />
                    <span className="text-xl text-white font-bold hover:text-gray-400 transition duration-300">AVELWARE</span>
                    </Link>
                </div>
                <nav className="text-white">
                    <ul>
                        <li className="mb-4">
                            <Link to={"/"} className="flex items-center hover:text-gray-400 transition duration-300">
                                <i className="fas fa-tachometer-alt mr-2" /> Dashboard
                            </Link>
                        </li>
                        <li className="mb-4">
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between hover:text-gray-400 transition duration-300">
                                    <span className="flex items-center fas fa-file-alt mr-2">
                                        <i className="fas fa-file-alt mr-2" /> Report
                                    </span>

                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="ml-4">
                                    <li className="mb-2">
                                        <Link to={"/reports/fuel-transaction-histories"} className="flex items-center hover:text-gray-400 transition duration-300">
                                            <i className="fas fa-gas-pump mr-2" /> Fuel Transaction History
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={"/reports/machine-usages"} className="flex items-center hover:text-gray-400 transition duration-300">
                                            <i className="fas fa-cogs mr-2" /> Machine Usage
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={"/reports/manpower-usages"} className="flex items-center hover:text-gray-400 transition duration-300">
                                            <i className="fas fa-users mr-2" /> Manpower Usage
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li className="mb-4">
                            <Link to={"/history"} className="flex items-center hover:text-gray-400 transition duration-300">
                                <i className="fas fa-history mr-2" /> History
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to={"/management"} className="flex items-center hover:text-gray-400 transition duration-300">
                                <i className="fas fa-cogs mr-2" /> Management
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to={"/profile"} className="flex items-center hover:text-gray-400 transition duration-300">
                                <i className="fas fa-user mr-2" /> Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Sidebar