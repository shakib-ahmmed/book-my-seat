import { useState } from 'react';
import DeleteModal from '../../model/DeleteModal';
import UpdateTicketModal from '../../model/UpdateTicketModel';


const TicketDataRow = ({ ticket }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const { title, from, to, transportType, price, quantity, status, perks, image } = ticket;

  return (
    <tr className="bg-white border-b">
      {/* Ticket Image */}
      <td className="px-5 py-5 text-sm">
        {image && (
          <img
            src={image}
            alt={title}
            className="h-12 w-20 object-cover rounded"
          />
        )}
      </td>

      {/* Ticket Details */}
      <td className="px-5 py-5 text-sm">
        <p className="text-gray-900">{title}</p>
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

      {/* Delete Button */}
      <td className="px-5 py-5 text-sm">
        <span
          onClick={openDeleteModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal isOpen={isDeleteOpen} closeModal={closeDeleteModal} ticketId={ticket._id} />
      </td>

      {/* Update Button */}
      <td className="px-5 py-5 text-sm">
        <span
          onClick={() => setIsEditOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdateTicketModal
          isOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          ticket={ticket}
        />
      </td>
    </tr>
  );
};

export default TicketDataRow;
