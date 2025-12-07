import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser, googleLogin, updateUserProfile, resetPassword } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            toast.warn("Please enter both email and password");
            return;
        }

        loginUser(email, password)
            .then(() => {
                toast.success("Login successful!", { position: "top-center" });
                navigate(from, { replace: true });
            })
            .catch((err) => {
                toast.error(`Login failed: ${err.message}`, { position: "top-center" });
            });
    };
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                updateUserProfile(user.displayName, user.photoURL);
                toast.success("Logged in with Google!", { position: "top-center" });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(`Google login failed: ${error.message}`, { position: "top-center" });
            });
    };

    const handleForgotPassword = async () => {
        const email = prompt("Enter your email to reset password:");
        if (!email) {
            toast.warn("Please enter your email first");
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
        <div className='flex justify-center min-h-screen items-center bg-gray-50'>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <h2 className='text-2xl font-semibold text-center py-4'>Login Your Account</h2>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="space-y-3">
                        <label className="label">Email</label>
                        <input
                            name='email'
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email"
                            required
                        />

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

                        {error && <p className='text-red-600'>{error}</p>}

                        <p
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-500 hover:underline cursor-pointer"
                        >
                            Forgot Password?
                        </p>

                        <button type='submit' className="btn bg-[#660103] text-white font-semibold btn-neutral w-full mt-4">Login</button>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn bg-[#660103] text-white font-semibold btn-outline w-full flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={20} />
                            Login with Google
                        </button>

                        <p className='font-semibold text-center pt-5'>
                            Don't Have An Account?
                            <Link to="/auth/registration" className='text-secondary ml-1'>Register</Link>
                        </p>
                    </fieldset>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
