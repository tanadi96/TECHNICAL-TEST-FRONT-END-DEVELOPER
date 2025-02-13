
import Navbar from "../components/Navbar";
import OilPickup from "../components/OilPickup";
import Sidebar from "../components/Sidebar";

function FuelTransaction() {
   
    return (
        <>
            <div className=" bg-gray-900">
                <Sidebar />
                <Navbar />
                <OilPickup />
            </div>

        </>

    )
}

export default FuelTransaction;