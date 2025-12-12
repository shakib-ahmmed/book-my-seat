import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const UserDataRow = ({ user, refetch }) => {
    const axiosSecure = useAxiosSecure();

    if (!user) return null;

    // Update user role: admin or vendor
    const handleRoleChange = async (newRole) => {
        if (!user._id) {
            console.error("User ID is missing!");
            return;
        }

        try {
            console.log(`Updating role of ${user.email} to ${newRole}...`);
            const res = await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
            console.log("Response:", res.data);
            toast.success(`User role updated to ${newRole}`);
            refetch(); // Refresh the user list
        } catch (err) {
            console.error("Failed to update role:", err);
            toast.error('Failed to update role');
        }
    };

    // Mark a vendor as fraud
    const handleMarkFraud = async () => {
        if (!user._id) {
            console.error("User ID is missing!");
            return;
        }

        try {
            console.log(`Marking vendor ${user.email} as fraud...`);
            const res = await axiosSecure.patch(`/users/${user._id}/fraud`);
            console.log("Response:", res.data);
            toast.success('Vendor marked as fraud');
            refetch(); // Refresh the user list
        } catch (err) {
            console.error("Failed to mark as fraud:", err);
            toast.error('Failed to mark as fraud');
        }
    };

    return (
        <tr className="border-b border-gray-200">
            <td className="px-5 py-3">{user.name || '-'}</td>
            <td className="px-5 py-3">{user.email || '-'}</td>
            <td className="px-5 py-3">{user.role || 'customer'}</td>
            <td className="px-5 py-3 flex gap-2">
                {user.role !== 'admin' && (
                    <>
                        <button
                            onClick={() => handleRoleChange('admin')}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Make Admin
                        </button>
                        <button
                            onClick={() => handleRoleChange('vendor')}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Make Vendor
                        </button>
                    </>
                )}
                {user.role === 'vendor' && (
                    <button
                        onClick={handleMarkFraud}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Mark as Fraud
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserDataRow;
