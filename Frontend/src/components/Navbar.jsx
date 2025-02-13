import React, { useEffect, useState } from 'react';
import { FaUser, FaEdit, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from Font Awesome

function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).replace("at", ",");

  return (
    <div className="fixed top-0 left-56 right-0 flex justify-between items-center bg-gray-900 p-4 h-16 z-50">
      <div className="relative">
        <input
          className="bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none"
          placeholder="Search"
          type="text"
        />
        <i className="fas fa-search absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="mr-4">
        <div className="flex items-center text-white">
          <div className="text-white mr-4">{formattedTime}</div>
          <img
            alt="User Avatar"
            className="rounded-full mr-2"
            height={40}
            src="https://storage.googleapis.com/a1aa/image/o9EJNMhXaMU6hcaktWNERvtlgsM5Yk6ItJ92ao4nIB4.jpg"
            width={40}
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="group flex items-center cursor-pointer p-2 rounded-lg transition duration-200"
            >
              <span className="mr-2">Adi Wandi</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-focus:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content text-gray-900 menu bg-white rounded-lg w-32 p-2 shadow-lg transition-opacity duration-200 opacity-0 group-focus:opacity-100"
            >
              <li className="hover:bg-gray-200 transition duration-200">
                <a className="flex items-center p-2">
                  <FaUser className="w-4 h-4 mr-2" />
                  My Profile
                </a>
              </li>
              <li className="hover:bg-gray-200 transition duration-200">
                <a className="flex items-center p-2">
                  <FaEdit className="w-4 h-4 mr-2" />
                  Edit Profile
                </a>
              </li>
              <li className="hover:bg-gray-200 transition duration-200">
                <a className="flex items-center p-2">
                  <FaCog className="w-4 h-4 mr-2" />
                  Settings
                </a>
              </li>
              <li className="hover:bg-gray-200 transition duration-200">
                <a className="flex items-center p-2">
                  <FaSignOutAlt className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
