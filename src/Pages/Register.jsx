import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, setUser, updateUser, googleLogin } = useContext(AuthContext);

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value.trim();
        const photo = form.photo.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;


        if (name.length < 6) {
            setNameError("Name must be at least 6 characters");
            return;
        }
        setNameError("");

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Include at least one UPPERCASE letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Include at least one lowercase letter");
            return;
        }
        setPasswordError("");


        createUser(email, password)
            .then((result) => {
                const user = result.user;

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });

                        toast.success("✅ Registration Successful");
                        navigate("/");
                    })
                    .catch(() => {
                        toast.error("Profile update failed");
                    });
            })
            .catch((error) => {
                toast.error(`❌ ${error.message}`);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                toast.success("✅ Google Login Successful");
                navigate("/");
            })
            .catch((error) => {
                toast.error(`❌ Google login failed: ${error.message}`);
            });
    };

    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <h2 className="text-center font-semibold text-2xl py-4">Register Your Account</h2>

                <form onSubmit={handleRegister} className="card-body">
                    <label className="label">Your Name</label>
                    <input type="text" name="name" className="input" placeholder="Name" required />
                    {nameError && <p className="text-red-600">{nameError}</p>}

                    <label className="label">Photo URL</label>
                    <input type="text" name="photo" className="input" placeholder="Photo URL" required />

                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" required />

                    <label className="label">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="input input-bordered pr-10"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordError && <p className="text-red-600">{passwordError}</p>}

                    <button type="submit" className="btn btn-neutral mt-4 w-full">
                        Register
                    </button>


                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full mt-2 flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={20} />
                        Signin with Google
                    </button>

                    <p className="font-semibold text-center pt-5">
                        Already have an account?
                        <Link to="/auth/login" className="text-secondary ml-1">Login</Link>
                    </p>
                </form>
            </div>

            <ToastContainer position="top-center" />
        </div>
    );
};

export default Register;


