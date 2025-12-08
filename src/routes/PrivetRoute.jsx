import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider.jsx";
import { Loader } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from "../Components/Footer.jsx";


export default function PrivetRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />;
    }

    return user ? (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    ) : (
        <Navigate to="/auth/login" replace />
    );
}
