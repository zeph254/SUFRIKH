import Navbar from "./Navbar";  // Adjust the path based on your structure
import Footer from "./Footer";  
import { Outlet } from "react-router-dom";

export default function Layout({ theme = "gray" }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow px-1 py-6">
                <Outlet />
            </main>
            <Footer theme={theme} />
        </div>
    );
}