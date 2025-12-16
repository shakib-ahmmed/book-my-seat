import { useEffect, useState } from 'react';

const TicketDataRow = ({ ticket, refetch, onDeleteClick, onPayClick }) => {
  const [countdown, setCountdown] = useState('');

  const departureDate = ticket.departure ? new Date(ticket.departure) : null;
  const isFutureDeparture = departureDate && departureDate > new Date();

  // Countdown
  useEffect(() => {
    if (!departureDate || ticket.status === 'rejected') return;

    const interval = setInterval(() => {
      const diff = departureDate - new Date();
      if (diff <= 0) {
        setCountdown('00:00:00:00');
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(`${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket.departure, ticket.status]);

  const totalPrice = ticket.quantity * (ticket.unitPrice || ticket.ticket?.price || 0);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-5 py-3">
          <img
            src={ticket.ticket?.image || '/placeholder.png'}
            alt={ticket.ticket?.title || 'Ticket'}
            className="w-20 h-20 object-cover rounded"
          />
        </td>
        <td className="px-5 py-3">{ticket.ticket?.title || 'Deleted Ticket'}</td>
        <td className="px-5 py-3">{ticket.ticket?.from || 'N/A'}</td>
        <td className="px-5 py-3">{ticket.ticket?.to || 'N/A'}</td>
        <td className="px-5 py-3">৳{ticket.ticket?.price || 0}</td>
        <td className="px-5 py-3">{ticket.quantity}</td>
        <td className="px-5 py-3">৳{totalPrice}</td>
        <td className="px-5 py-3 capitalize">{ticket.status}</td>
        <td className="px-5 py-3 space-y-1">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-800 transition"
            onClick={() => onDeleteClick(ticket)}
          >
            Delete
          </button>

          {ticket.status === 'accepted' && isFutureDeparture && (
            <button
              className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 transition"
              onClick={() => onPayClick(ticket)}
            >
              Pay Now
            </button>
          )}

          {ticket.status !== 'rejected' && departureDate && (
            <p className="text-lg text-gray-500 mt-1">{countdown}</p>
          )}
        </td>
      </tr>

      {/* Mobile card */}
      <div className="md:hidden bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center gap-4">
          <img
            src={ticket.ticket?.image || '/placeholder.png'}
            alt={ticket.ticket?.title || 'Ticket'}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{ticket.ticket?.title || 'Deleted Ticket'}</h3>
            <p className="text-sm text-gray-500">
              {ticket.ticket?.from || 'N/A'} → {ticket.ticket?.to || 'N/A'}
            </p>
            <p className="text-sm">Qty: {ticket.quantity}</p>
            <p className="text-sm">Total: ৳{totalPrice}</p>
            <p className="text-sm">Status: {ticket.status}</p>
            {ticket.status !== 'rejected' && departureDate && (
              <p className="text-xs lg:text-lg text-gray-500 mt-1">{countdown}</p>
            )}
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-800 transition flex-1"
            onClick={() => onDeleteClick(ticket)}
          >
            Delete
          </button>
          {ticket.status === 'accepted' && isFutureDeparture && (
            <button
              className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 transition flex-1"
              onClick={() => onPayClick(ticket)}
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketDataRow;
