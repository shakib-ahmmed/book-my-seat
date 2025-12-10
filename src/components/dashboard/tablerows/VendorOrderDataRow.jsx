import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";

const VendorDataRow = ({ data, type, onStatusChange, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    const handleStatusChange = (e) => {
        if (onStatusChange) onStatusChange(data, e.target.value);
    };

    return (
        <tr className="bg-white border-b">

            <td className="px-5 py-3">{data.ticketTitle || data.name}</td>
            {type === "booking" && (
                <>
                    <td className="px-5 py-3">{data.userName}</td>
                    <td className="px-5 py-3">{data.userEmail}</td>
                    <td className="px-5 py-3">{data.quantity}</td>
                    <td className="px-5 py-3">${data.price * data.quantity}</td>
                </>
            )}
            {type === "ticket" && (
                <>
                    <td className="px-5 py-3">{data.price}</td>
                    <td className="px-5 py-3">{data.quantity}</td>
                    <td className="px-5 py-3">{data.status}</td>
                </>
            )}

            {/* Status / Actions */}
            <td className="px-5 py-3">
                {type === "booking" ? (
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 bg-green-200 text-green-800 rounded"
                            onClick={() => onStatusChange && onStatusChange(data, "accepted")}
                        >
                            Accept
                        </button>
                        <button
                            className="px-3 py-1 bg-red-200 text-red-800 rounded"
                            onClick={() => onStatusChange && onStatusChange(data, "rejected")}
                        >
                            Reject
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <select
                            value={data.status}
                            onChange={handleStatusChange}
                            className="border p-1 rounded text-gray-900"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">Start Processing</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <button
                            disabled={data.status === "Rejected"}
                            onClick={() => setIsOpen(true)}
                            className={`px-3 py-1 rounded ${data.status === "Rejected"
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-200 text-red-800"
                                }`}
                        >
                            Delete
                        </button>
                        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
                    </div>
                )}
            </td>
        </tr>
    );
};

export default VendorDataRow;
