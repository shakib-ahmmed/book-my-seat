import { useState } from 'react';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import UpdateUserRoleModal from '../../../../../../../Users/User/Downloads/b12-m11-session-part3-main/b12-m11-session-part3-main/frontend/src/components/Modal/UpdateUserRoleModal';

const UserDataRow = ({ user, refetch, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const closeModal = () => setIsOpen(false);

    const handleDelete = async () => {
        if (user.email === currentUser.email) {
            toast.error("You cannot delete yourself!");
            return;
        }
        try {
            await axiosSecure.delete(`/users/${user._id}`);
            toast.success('User deleted successfully');
            refetch();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <tr className="bg-white border-b">
            <td className="px-5 py-5 text-sm text-gray-900">{user?.name || 'N/A'}</td>
            <td className="px-5 py-5 text-sm text-gray-900">{user?.email}</td>
            <td className="px-5 py-5 text-sm text-gray-900">{user?.role}</td>
            <td className="px-5 py-5 text-sm">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative inline-block px-3 py-1 font-semibold text-green-900"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Update Role</span>
                    </button>

                    <button
                        onClick={handleDelete}
                        className={`relative inline-block px-3 py-1 font-semibold text-red-900 ${user.email === currentUser.email
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                            }`}
                        disabled={user.email === currentUser.email}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Delete</span>
                    </button>
                </div>

                <UpdateUserRoleModal
                    user={user}
                    refetch={refetch}
                    isOpen={isOpen}
                    closeModal={closeModal}
                />
            </td>
        </tr>
    );
};

export default UserDataRow;
