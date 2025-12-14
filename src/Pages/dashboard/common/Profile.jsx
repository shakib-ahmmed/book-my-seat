import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../provider/AuthContext";

const Profile = () => {
    const { user, role, loading, updateUser } = useContext(AuthContext);

    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [previewPhoto, setPreviewPhoto] = useState("");

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
            setPreviewPhoto(user.photoURL || "");
        }
    }, [user]);

    useEffect(() => {
        setPreviewPhoto(photoURL);
    }, [photoURL]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!displayName.trim()) {
            toast.warn("Name cannot be empty", { position: "top-center" });
            return;
        }

        try {
            await updateUser({ displayName, photoURL });
            toast.success("Profile updated successfully!", { position: "top-center" });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile", { position: "top-center" });
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-screen w-full bg-[#fddb1a]/20 flex items-center justify-center p-6">
            <div className="bg-[#b0bdc0] shadow-2xl rounded-3xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden">

                {/* LEFT */}
                <div className="lg:w-1/3 bg-[#fddb1a]/70 flex flex-col items-center justify-center p-10 relative">
                    <div className="absolute-top-16">
                        {previewPhoto ? (
                            <img
                                src={previewPhoto}
                                alt="Profile"
                                className="w-40 h-40 rounded-full border-4 border-[#b0bdc0] object-cover shadow-xl"
                            />
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-[#c7c386] flex items-center justify-center">
                                <span className="text-5xl font-bold text-[#5c0809]">
                                    {displayName?.[0] || "U"}
                                </span>
                            </div>
                        )}
                    </div>

                    <h2 className="mt-28 text-3xl font-bold text-[#5c0809]">{displayName || "User"}</h2>
                    <p className="text-[#645d5e] mt-2">{user?.email}</p>

                    {/* Use role from context */}
                    <span className="mt-6 px-6 py-2 bg-[#e7d351] rounded-full text-sm font-semibold">
                        {role?.charAt(0).toUpperCase() + role?.slice(1) || "Customer"}
                    </span>
                </div>

                {/* RIGHT */}
                <div className="lg:w-2/3 p-10">
                    <h2 className="text-3xl font-bold text-[#5c0809] mb-6">My Profile</h2>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="email"
                            value={user?.email}
                            disabled
                            className="input input-bordered w-full bg-gray-200"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#ba0c10] hover:bg-[#5c0809] text-white rounded-xl font-bold"
                        >
                            Update Profile
                        </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                        <div className="p-4 bg-[#c7c386] rounded-xl">
                            <p className="text-sm">User ID</p>
                            <p className="font-bold break-all">{user?.uid}</p>
                        </div>
                        <div className="p-4 bg-[#c7c386] rounded-xl">
                            <p className="text-sm">Account Created</p>
                            <p className="font-bold">
                                {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Profile;
