import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UserDataRow = ({ user, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleMakeAdmin = async () => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}/role`, {
                role: 'admin',
            });

            if (res.data?.modifiedCount > 0 || res.data?.message) {
                Swal.fire('Success', 'User is now Admin', 'success');
                refetch();
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update role', 'error');
        }
    };

    const handleMakeVendor = async () => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}/role`, {
                role: 'vendor',
            });

            if (res.data?.modifiedCount > 0 || res.data?.message) {
                Swal.fire('Success', 'User is now Vendor', 'success');
                refetch();
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update role', 'error');
        }
    };

    const handleMarkFraud = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This vendor will be marked as fraud!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, mark fraud',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/${user._id}/fraud`);

                    if (res.data?.message) {
                        Swal.fire('Marked!', 'Vendor marked as fraud', 'success');
                        refetch();
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire('Error', 'Failed to mark fraud', 'error');
                }
            }
        });
    };

    return (
        <tr>
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {user.name || 'N/A'}
            </td>
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                {user.email}
            </td>
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm capitalize">
                {user.role}
            </td>
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm space-x-2">
                {user.role !== 'admin' && (
                    <button
                        onClick={handleMakeAdmin}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                    >
                        Make Admin
                    </button>
                )}

                {user.role !== 'vendor' && (
                    <button
                        onClick={handleMakeVendor}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                    >
                        Make Vendor
                    </button>
                )}

                {user.role === 'vendor' && !user.fraud && (
                    <button
                        onClick={handleMarkFraud}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                        Mark Fraud
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserDataRow;
