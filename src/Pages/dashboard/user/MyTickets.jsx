import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TicketDataRow from '../../../components/dashboard/tablerows/TicketsDataRow';

const MyTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['myTickets', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-tickets`);
      console.log('Backend response:', res.data);

      if (Array.isArray(res.data)) return res.data;
      if (res.data?.tickets && Array.isArray(res.data.tickets)) return res.data.tickets;
      return []; 
    },
  });

  const tickets = data || []; 

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Tickets
        </h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Ticket Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tickets.length > 0 ? (
                  tickets.map(ticket => (
                    <TicketDataRow
                      key={ticket._id}
                      ticket={ticket}
                      refetch={refetch}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      You have no tickets yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
