import React, { useContext, useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../provider/AuthContext';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);

    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [previewPhoto, setPreviewPhoto] = useState(user?.photoURL || "");

    useEffect(() => {
        setPreviewPhoto(photoURL || user?.photoURL || '');
    }, [photoURL, user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!displayName.trim()) {
            toast.warn("Name cannot be empty", { position: "top-center" });
            return;
        }
        try {
            await updateProfile(user, { displayName, photoURL });
            setUser({ ...user, displayName, photoURL });
            toast.success("Profile updated successfully!", { position: "top-center" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile!", { position: "top-center" });
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#fddb1a]/20 flex items-center justify-center p-6">
            <div className="bg-[#b0bdc0] shadow-2xl rounded-3xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden">

                {/* Left - Profile Preview */}
                <div className="lg:w-1/3 bg-[#fddb1a]/70 via-[#e7d351]/50 to-[#fddb1a]/50 flex flex-col items-center justify-center p-10 lg:p-16 relative">
                    <div className="absolute -top-16 lg:-top lg:pt-50">
                        {previewPhoto ? (
                            <img
                                src={previewPhoto}
                                alt="Profile Preview"
                                className="w-30 h-30 lg:w-52 lg:h-52 rounded-full border-4 border-[#b0bdc0] object-cover shadow-xl"
                            />
                        ) : (
                            <div className="w-30 h-30 lg:w-52 lg:h-52 rounded-full border-4 border-[#b0bdc0] flex items-center justify-center shadow-xl bg-[#c7c386]">
                                <span className="text-[#5c0809] text-5xl font-bold">U</span>
                            </div>
                        )}
                    </div>
                    <h2 className="mt-28 lg:mt-32 text-3xl lg:text-4xl font-bold text-[#5c0809] text-center">
                        {user?.displayName || "User"}
                    </h2>
                    <p className="text-[#645d5e] text-center mt-2 text-lg">{user?.email}</p>
                    <span className="mt-6 inline-block bg-[#e7d351] text-[#230c0b] px-6 py-2 text-sm lg:text-base rounded-full uppercase font-semibold tracking-wide">
                        Customer
                    </span>
                </div>

                {/* Right - Form */}
                <div className="lg:w-2/3 p-10 lg:p-16 flex flex-col justify-center gap-8 bg-[#b0bdc0]">
                    <h2 className="text-3xl font-bold mb-6 text-[#5c0809]">My Profile</h2>
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="label font-semibold text-[#5c0809]">Full Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full border-[#fddb1a]"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label font-semibold text-[#5c0809]">Photo URL</label>
                            <input
                                type="text"
                                className="input input-bordered w-full border-[#fddb1a]"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label font-semibold text-[#5c0809]">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full bg-[#e7d351]/20 text-[#5c0809]"
                                value={user?.email}
                                disabled
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#ba0c10] hover:bg-[#5c0809] text-[#b0bdc0] rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-105"
                        >
                            Update Profile
                        </button>
                    </form>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                        <div className="p-6 rounded-xl shadow-lg bg-[#c7c386] border border-[#645d5e]">
                            <p className="text-sm text-[#645d5e]">User ID</p>
                            <p className="mt-2 font-bold text-[#5c0809] text-lg break-all">{user?.uid}</p>
                        </div>

                        <div className="p-6 rounded-xl shadow-lg bg-[#c7c386] border border-[#645d5e]">
                            <p className="text-sm text-[#645d5e]">Account Created</p>
                            <p className="mt-2 font-bold text-[#7e0304] text-lg">
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
