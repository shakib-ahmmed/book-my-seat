import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../provider/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn, updateUser, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            toast.warn("Please enter both email and password", { position: "top-center" });
            return;
        }

        try {
            await signIn(email, password);
            toast.success("Login successful!", { position: "top-center" });
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(`Login failed: ${error.message}`, { position: "top-center" });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            await updateUser({ displayName: user.displayName, photoURL: user.photoURL });
            toast.success("Logged in with Google!", { position: "top-center" });
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(`Google login failed: ${error.message}`, { position: "top-center" });
        }
    };

    const handleForgotPassword = async () => {
        const email = prompt("Enter your email to reset password:");
        if (!email) {
            toast.warn("Please enter your email first", { position: "top-center" });
            return;
        }

        try {
            await resetPassword(email);
            toast.success("Password reset email sent! Check your inbox.", { position: "top-center" });
        } catch (error) {
            toast.error(`Failed to send reset email: ${error.message}`, { position: "top-center" });
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className="card bg-white w-full max-w-sm shadow-2xl rounded-xl">
                <h2 className='text-2xl font-semibold text-center py-4 text-[#660103]'>Login Your Account</h2>
                <form onSubmit={handleLogin} className="card-body space-y-4">
                    <div className="space-y-2">
                        <label className="label">Email</label>
                        <input
                            name='email'
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                name='password'
                                type={showPassword ? "text" : "password"}
                                className="input input-bordered w-full pr-10"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <p
                        onClick={handleForgotPassword}
                        className="text-sm text-blue-500 hover:underline cursor-pointer"
                    >
                        Forgot Password?
                    </p>

                    <button
                        type='submit'
                        className="btn bg-[#660103] text-white font-semibold w-full mt-2 hover:bg-[#800f0f]"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn bg-white border border-gray-300 w-full flex items-center justify-center gap-2 mt-2 hover:bg-gray-100"
                    >
                        <FcGoogle size={20} />
                        Login with Google
                    </button>

                    <p className='font-semibold text-center pt-5 text-gray-700'>
                        Don't have an account?{' '}
                        <Link to="/auth/registration" className='text-[#660103] hover:underline'>Register</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
