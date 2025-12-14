import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();


  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets?status=approved");
      return res.data;
    },
  });

 
  const toggleAdvertiseMutation = useMutation(
    async (ticket) => {
     
      if (!ticket.advertise) {
        const advertisedCount = tickets.filter(t => t.advertise).length;
        if (advertisedCount >= 6) {
          throw new Error("You cannot advertise more than 6 tickets at a time");
        }
      }
      const res = await axiosSecure.patch(`/tickets/${ticket._id}/advertise`, {
        advertise: !ticket.advertise,
      });
      return res.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["approved-tickets"]),
      onError: (err) => Swal.fire("Error", err.message, "error"),
    }
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Advertise Tickets</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-5 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Title
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Price
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Quantity
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Advertise
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b">
                <td className="px-5 py-3">{ticket.title}</td>
                <td className="px-5 py-3">{ticket.price} BDT</td>
                <td className="px-5 py-3">{ticket.quantity}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleAdvertiseMutation.mutate(ticket)}
                    className={`px-4 py-1 rounded font-semibold text-white ${
                      ticket.advertise ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    {ticket.advertise ? "Advertised" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTickets;
