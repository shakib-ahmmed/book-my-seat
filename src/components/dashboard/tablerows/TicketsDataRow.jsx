import React from "react";

const TicketDataRow = ({ ticket: booking, refetch }) => {
  const ticket = booking.ticket;

  if (!ticket) {
    return (
      <tr>
        <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
          Ticket details not available
        </td>
      </tr>
    );
  }


  const totalPrice = ticket.price * booking.quantity;


  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">

      <td className="px-6 py-4">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      <td className="px-6 py-4">{ticket.title}</td>

      <td className="px-6 py-4">{ticket.from}</td>

      <td className="px-6 py-4">{ticket.to}</td>

      <td className="px-6 py-4">{ticket.price} BDT</td>

      <td className="px-6 py-4">{booking.quantity}</td>

      <td className="px-6 py-4 font-semibold">{totalPrice} BDT</td>

      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${booking.status === "Pending"
            ? "bg-yellow-200 text-yellow-800"
            : booking.status === "Confirmed"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
            }`}
        >
          {booking.status}
        </span>
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <button
          onClick={async () => {
            try {
              await fetch(`http://localhost:5000/bookings/${booking._id}`, {
                method: "DELETE",
              });
              refetch();
            } catch (err) {
              console.error(err);
            }
          }}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default TicketDataRow;
