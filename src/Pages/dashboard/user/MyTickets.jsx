import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TicketDataRow from '../../../components/dashboard/tablerows/TicketsDataRow';
import { useState, useEffect } from 'react';
import DeleteModal from '../../../components/model/DeleteModal';

const MyTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    data: tickets = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ['myTickets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/my-tickets?email=${user.email}`);
        return Array.isArray(res.data) ? res.data : [];
      } catch (error) {
        toast.error('Failed to load your tickets');
        throw error;
      }
    },
  });

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/my-tickets/${selectedTicket._id}`);
      toast.success('Ticket deleted successfully!');
      setIsDeleteOpen(false);
      setSelectedTicket(null);
      refetch();
    } catch (error) {
      toast.error('Failed to delete ticket');
      console.error(error);
    }
  };

  const handlePayNow = async (ticket) => {
    const departure = new Date(ticket.departure);
    if (departure < new Date()) {
      toast.error('Cannot pay for a ticket with passed departure.');
      return;
    }

    try {
      toast.success(`Paid ৳${(ticket.quantity * (ticket.ticket?.price || 0)).toFixed(2)} successfully!`);

      await axiosSecure.patch(`/my-tickets/${ticket._id}/pay`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Payment failed!');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        Something went wrong while loading tickets.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Tickets</h2>

      {tickets.length === 0 && (
        <div className="text-center text-gray-500 py-10">You have no tickets yet.</div>
      )}

      {/* Desktop Table */}
      {tickets.length > 0 && (
        <div className="hidden md:block overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                {['Image', 'Ticket', 'From', 'To', 'Price', 'Qty', 'Total', 'Status', 'Action'].map((head) => (
                  <th
                    key={head}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketDataRow
                  key={ticket._id}
                  ticket={ticket}
                  refetch={refetch}
                  onDeleteClick={(t) => {
                    setSelectedTicket(t);
                    setIsDeleteOpen(true);
                  }}
                  onPayClick={handlePayNow}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {tickets.map((ticket) => (
          <TicketDataRow
            key={ticket._id}
            ticket={ticket}
            refetch={refetch}
            onDeleteClick={(t) => {
              setSelectedTicket(t);
              setIsDeleteOpen(true);
            }}
            onPayClick={handlePayNow} 
          />
        ))}
      </div>

      {selectedTicket && (
        <DeleteModal
          isOpen={isDeleteOpen}
          closeModal={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyTickets;
