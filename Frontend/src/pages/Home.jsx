import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

function Home() {


    return (
        <>
            <div className=" bg-gray-900">
                <Sidebar />
                <Navbar />
                <Dashboard />
            </div>

        </>
    )
}

export default Home;