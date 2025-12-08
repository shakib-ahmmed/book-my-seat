import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../components/Navbar";



export default function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-1 flex-col min-h-screen">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
