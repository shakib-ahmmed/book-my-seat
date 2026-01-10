import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../provider/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!email || !password) {
            toast.warn("Please enter both email and password");
            return;
        }

        try {
            await signIn(email, password);
            toast.success("✅ Login Successful");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(`❌ Login failed: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleSignIn();
            toast.success("✅ Google Login Successful");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(`❌ Google login failed: ${error.message}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100">
            <div className="card w-full max-w-sm shadow-2xl rounded-xl bg-base-100">
                <h2 className="text-center font-semibold text-2xl py-4" style={{ color: '#FDDB1A' }}>
                    Login Your Account
                </h2>

                <form onSubmit={handleLogin} className="card-body">
                    <label className="label text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="input input-bordered w-full bg-[#3a2d2d] border-gray-600 text-white focus:border-[#FDDB1A] focus:ring-[#FDDB1A]"
                    />

                    <label className="label text-white">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="input input-bordered w-full pr-10 bg-[#3a2d2d] border-gray-600 text-white focus:border-[#FDDB1A] focus:ring-[#FDDB1A]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn mt-4 w-full"
                        style={{ backgroundColor: '#660103', color: 'white' }}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full mt-2 flex items-center justify-center gap-2"
                        style={{ borderColor: '#660103', color: 'white' }}
                    >
                        <FcGoogle size={20} />
                        Login with Google
                    </button>

                    <p className="font-semibold text-center pt-5 text-white">
                        Don't have an account?{' '}
                        <Link to="/auth/registration" className="ml-1" style={{ color: '#FDDB1A', textDecoration: 'underline' }}>
                            Register
                        </Link>
                    </p>
                </form>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default Login;
