import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();


  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets?status=approved");
      return res.data.map(ticket => ({
        ...ticket,
        advertise: ticket.advertise || false,
      }));
    },
  });

  const toggleAdvertiseMutation = useMutation({
    mutationFn: async (ticket) => {
      if (!ticket.advertise) {
        const advertisedCount = tickets.filter(t => t.advertise).length;
        if (advertisedCount >= 6) {
          throw new Error("You cannot advertise more than 6 tickets at a time");
        }
      }

      const res = await axiosSecure.patch(
        `/tickets/${ticket._id}/advertise`,
        { advertise: !ticket.advertise }
      );

      return res.data;
    },
    onSuccess: (_, ticket) => {
      queryClient.invalidateQueries({ queryKey: ["approved-tickets"] });
      toast.success(
        ticket.advertise
          ? "Ticket unadvertised successfully!"
          : "Ticket advertised successfully!"
      );
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (tickets.length === 0) {
    return (
      <p className="text-center mt-10 text-[#240d0b] font-semibold">
        No approved tickets available.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6 text-[#240d0b]">
        Advertise Tickets Section
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#b0bdc0] shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#e9d44c] text-[#240d0b]">
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">
                Image
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">
                Title
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">
                Price
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">
                Quantity
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">
                Advertise
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b bg-[#fddb1a] even:bg-[#c9c484] hover:bg-[#e9d44c] transition-colors"
              >
                {/* Image */}
                <td className="px-5 py-3">
                  <img
                    src={ticket.image || "/placeholder.png"}
                    alt={ticket.title}
                    className="w-20 h-14 object-cover rounded-md border border-[#240d0b]"
                  />
                </td>

                {/* Title */}
                <td className="px-5 py-3 text-[#240d0b] font-medium">
                  {ticket.title}
                </td>

                {/* Price */}
                <td className="px-5 py-3 text-[#240d0b] font-medium">
                  {ticket.price} BDT
                </td>

                {/* Quantity */}
                <td className="px-5 py-3 text-[#240d0b] font-medium">
                  {ticket.quantity}
                </td>

                {/* Advertise Button */}
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleAdvertiseMutation.mutate(ticket)}
                    disabled={toggleAdvertiseMutation.isLoading}
                    className={`px-4 py-1 rounded font-semibold cursor-pointer text-white transition-colors duration-300
                      ${ticket.advertise
                        ? "bg-[#7e0304] hover:bg-[#5b0809]"
                        : "bg-[#ba0c10] hover:bg-[#290202]"
                      }
                    `}
                  >
                    {ticket.advertise ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdvertiseTickets;
