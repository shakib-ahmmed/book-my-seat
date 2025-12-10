import useAuth from "../../../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="w-full flex justify-center px-4">
            <div className="bg-[#b0bdc0] shadow-lg rounded-xl w-full max-w-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#fddb1a] to-[#e7d351] h-32 relative">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-[#b0bdc0] object-cover shadow-xl"
                        />
                    </div>
                </div>

                <div className="pt-16 pb-6 px-6 text-center">
                    <h2 className="text-2xl font-bold text-[#5c0809]">
                        {user?.displayName || "User"}
                    </h2>
                    <p className="text-[#645d5e]">{user?.email}</p>

                    <p className="mt-2 inline-block bg-[#e7d351] text-[#230c0b] px-3 py-1 text-xs rounded-full">
                        Customer
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
                        <div className="bg-[#c7c386] p-4 rounded-lg border border-[#645d5e]">
                            <p className="text-sm text-[#645d5e]">User ID</p>
                            <p className="font-semibold text-[#5c0809] break-all">
                                {user?.uid}
                            </p>
                        </div>

                        <div className="bg-[#c7c386] p-4 rounded-lg border border-[#645d5e]">
                            <p className="text-sm text-[#645d5e]">Account Status</p>
                            <p className="font-semibold text-[#7e0304]">Active</p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-6 py-2 bg-[#ba0c10] hover:bg-[#5c0809] text-[#b0bdc0] rounded-lg transition">
                            Update Profile
                        </button>

                        <button className="px-6 py-2 bg-[#ba0c10] hover:bg-[#5c0809] text-[#b0bdc0] rounded-lg transition">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
