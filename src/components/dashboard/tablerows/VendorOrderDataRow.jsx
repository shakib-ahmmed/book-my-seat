import { useState } from "react";
import DeleteModal from "../../model/DeleteModal";

const VendorOrderDataRow = ({ ticket, type = "ticket", onStatusChange, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    const handleStatusChange = (e) => {
        if (onStatusChange) onStatusChange(ticket, e.target.value);
    };

    return (
        <tr className="bg-white border-b">
            <td className="px-5 py-3">{ticket.title || "No Title"}</td>

            {type === "ticket" && (
                <>
                    <td className="px-5 py-3">{ticket.price || 0}</td>
                    <td className="px-5 py-3">{ticket.quantity || 0}</td>
                    <td className="px-5 py-3">{ticket.status || "Pending"}</td>
                </>
            )}

            {/* Actions */}
            <td className="px-5 py-3">
                {type === "ticket" && (
                    <div className="flex gap-2 cursor-pointer">
                        <button
                            disabled={ticket.status?.toLowerCase() === "rejected"}
                            onClick={() => setIsOpen(true)}
                            className={`px-3 py-1 rounded transition-all
        ${ticket.status?.toLowerCase() === "rejected"
                                    ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                    : "bg-red-200 text-red-800 hover:bg-red-300 cursor-pointer"
                                }`}
                        >
                            Delete
                        </button>


                        <DeleteModal
                            isOpen={isOpen}
                            closeModal={closeModal}
                            onDelete={() => onDelete && onDelete(ticket._id)}
                        />
                    </div>
                )}
            </td>
        </tr>
    );
};

export default VendorOrderDataRow;
