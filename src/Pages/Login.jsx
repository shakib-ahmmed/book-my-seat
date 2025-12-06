import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
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
       
            </div >
    <ToastContainer />
        </div >
    );
};

export default Login;
