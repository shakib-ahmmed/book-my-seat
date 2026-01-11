import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, setUser, updateUser, googleLogin } =
        useContext(AuthContext);

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

        if (
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password)
        ) {
            setPasswordError(
                "Password must be 6+ chars with upper & lower case"
            );
            return;
        }
        setPasswordError("");

        createUser(email, password)
            .then((result) => {
                updateUser({ displayName: name, photoURL: photo }).then(() => {
                    setUser({
                        ...result.user,
                        displayName: name,
                        photoURL: photo,
                    });
                    toast.success("✅ Registration Successful");
                    navigate("/");
                });
            })
            .catch((error) => toast.error(`❌ ${error.message}`));
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("✅ Google Login Successful");
                navigate("/");
            })
            .catch((error) =>
                toast.error(`❌ Google login failed: ${error.message}`)
            );
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 transition-colors">
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl border border-[#660103]">

                <h2 className="text-center font-semibold text-2xl py-4 text-[#070706]">
                    Register Your Account
                </h2>

                <form onSubmit={handleRegister} className="card-body">
                    <label className="label text-base-content">Your Name</label>
                    <input name="name" className="input input-bordered bg-base-200" required />
                    {nameError && <p className="text-red-600">{nameError}</p>}

                    <label className="label text-base-content">Photo URL</label>
                    <input name="photo" className="input input-bordered bg-base-200" required />

                    <label className="label text-base-content">Email</label>
                    <input type="email" name="email" className="input input-bordered bg-base-200" required />

                    <label className="label text-base-content">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="input input-bordered bg-base-200 pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordError && <p className="text-red-600">{passwordError}</p>}

                    <button
                        type="submit"
                        className="btn w-full mt-4 text-white"
                        style={{ backgroundColor: "#660103" }}
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full mt-2 flex items-center justify-center gap-2"
                        style={{ borderColor: "#660103", color: "#660103" }}
                    >
                        <FcGoogle size={20} />
                        Sign in with Google
                    </button>

                    <p className="font-semibold text-center pt-5 text-base-content">
                        Already have an account?
                        <Link to="/auth/login" className="ml-1 underline text-secondary">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
