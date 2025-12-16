import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const VendorRequestDataRow = ({ request, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleApprove = async () => {
        try {
            await axiosSecure.patch('/update-role', {
                email: request?.email,
                role: 'vendor', 
            });
            toast.success('Vendor role approved!');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <tr className="bg-white hover:bg-gray-50 transition-all border-b border-gray-200">
            <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                {request?.email}
            </td>


            <td className="px-6 py-4 text-sm">
                <button
                    onClick={handleApprove}
                    className="relative inline-flex items-center px-4 py-2 font-semibold text-green-900 hover:text-white bg-green-100 hover:bg-green-500 rounded-full transition-colors duration-200"
                >
                    <span className="absolute inset-0 rounded-full bg-green-200 opacity-50 hover:opacity-0 transition-opacity duration-200"></span>
                    <span className="relative">Approve Vendor</span>
                </button>
            </td>
        </tr>
    );
};

export default VendorRequestDataRow;
