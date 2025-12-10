import { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';

const UserOrderDataRow = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    const {
        ticketTitle,
        from,
        to,
        transportType,
        price,
        quantity,
        status,
        image,
    } = order || {};

    return (
        <tr className="bg-white border-b">
            <td className="px-5 py-5 text-sm">
                {image && (
                    <img
                        src={image}
                        alt={ticketTitle}
                        className="h-12 w-20 object-cover rounded"
                    />
                )}
            </td>
            <td className="px-5 py-5 text-sm">
                <p className="text-gray-900">{ticketTitle}</p>
            </td>
            <td className="px-5 py-5 text-sm">
                <p className="text-gray-900">{from} → {to}</p>
            </td>
            <td className="px-5 py-5 text-sm">
                <p className="text-gray-900">{transportType}</p>
            </td>
            <td className="px-5 py-5 text-sm">
                <p className="text-gray-900">${price}</p>
            </td>
            <td className="px-5 py-5 text-sm">
                <p className="text-gray-900">{quantity}</p>
            </td>
            <td className="px-5 py-5 text-sm">
                <p className="text-gray-900">{status}</p>
            </td>
            <td className="px-5 py-5 text-sm">
                <button
                    onClick={() => setIsOpen(true)}
                    className={`relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight ${status === 'Delivered' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={status === 'Delivered'}
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Cancel</span>
                </button>
                <DeleteModal isOpen={isOpen} closeModal={closeModal} orderId={order._id} />
            </td>
        </tr>
    );
};

export default UserOrderDataRow;
