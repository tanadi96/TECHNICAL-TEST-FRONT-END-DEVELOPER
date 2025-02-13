import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { oilPickups } from "../data/data";

function OilPickup() {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const itemsPerPage = 10;
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (selectedDates[0] && selectedDates[1]) {
            setStartDate(selectedDates[0]);
            setEndDate(selectedDates[1]);
        }
    }, [selectedDates]);

    const filteredPickups = oilPickups.filter((pickup) => {
        const pickupDate = new Date(pickup.Date);
        const isAfterStartDate = startDate ? pickupDate >= startDate : true;
        const isBeforeEndDate = endDate ? pickupDate <= endDate : true;
        return isAfterStartDate && isBeforeEndDate;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPickups.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPickups.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="ml-56 mt-16 p-0">
            <div className="mt-4 bg-gray-800 shadow-lg p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Report / Fuel Transaction History
                    </h1>
                    <div className="flex gap-2">
                        <h2 className="text-white">Filter by date range:</h2>
                        <button
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className="p-2 rounded bg-gray-700 text-white"
                        >
                            {selectedDates[0] && selectedDates[1]
                                ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
                                : "Select Date Range"}
                        </button>
                        {showDatePicker && (
                            <DatePicker
                                selected={selectedDates[0]}
                                onChange={(dates) => setSelectedDates(dates)}
                                startDate={selectedDates[0]}
                                endDate={selectedDates[1]}
                                selectsRange
                                inline
                                dateFormat="yyyy-MM-dd"
                                className="p-2 rounded bg-gray-700 text-white"
                                showYearDropdown
                                dropdownMode="select"
                            />
                        )}

                        <button
                            onClick={() => console.log("Exporting data...")}
                            className="p-2 rounded bg-gray-700 text-white flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Export
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-gray-700">
                            <thead className="bg-white text-black">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Time/Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Station</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">License</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Fuel</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Fuel Usage(L)</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Left Over(L)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentItems.map((pickup) => (
                                    <tr key={pickup.ID} className="hover:bg-gray-950 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.ID}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.Date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.Station}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.Name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.License}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.Code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.Fuel}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.FuelUsage}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{pickup.LeftOver}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4 gap-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded bg-gray-800 text-white"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default OilPickup;
