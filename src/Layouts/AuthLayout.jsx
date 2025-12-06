import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../Components/Footer";



export default function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
