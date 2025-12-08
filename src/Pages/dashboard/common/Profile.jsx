import useAuth from "../../../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="w-full flex justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 h-32 relative">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-xl"
                        />
                    </div>
                </div>

                <div className="pt-16 pb-6 px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {user?.displayName || "User"}
                    </h2>
                    <p className="text-gray-500">{user?.email}</p>

                    <p className="mt-2 inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-xs rounded-full">
                        Customer
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="font-semibold text-gray-800 break-all">
                                {user?.uid}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <p className="text-sm text-gray-500">Account Status</p>
                            <p className="font-semibold text-green-600">Active</p>
                        </div>
                    </div>

                    

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg transition">
                            Update Profile
                        </button>

                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg transition">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
