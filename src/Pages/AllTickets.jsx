import React, { useState, useEffect } from "react";
import TicketCard from "../components/Home/TicketCard";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import LoadingSpinner from "../components/LoadingSpinner";
import CheckoutForm from "../components/form/CheckoutForm";
import BookingModal from "../components/model/BookingModal";



const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://book-my-seat-server.vercel.app/tickets?search=${searchQuery}&sortBy=${sortBy}&order=${order}`
        );
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error("Failed to load tickets:", err);
      }
      setLoading(false);
    };

    fetchTickets();
  }, [sortBy, order, searchQuery]);

  if (loading) return <LoadingSpinner />;

  const openBookingModal = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setModalOpen(true);
  };

  return (
    <div className="lg:w-10/12 mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {searchQuery ? `Search: ${searchQuery}` : "All Tickets"}
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center w-12 md:w-1/2 gap-2">
          <input
            type="text"
            placeholder="Search by ticket title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-sm"
          />
          <button
            onClick={() => setSearchQuery(search)}
            className="btn bg-[#5C0809] text-white font-semibold px-4 hover:scale-105 transition ease-in-out flex items-center justify-center py-1.5 rounded-lg"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600 text-sm font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="price">Price</option>
            <option value="departure">Departure Date</option>
          </select>

          <button
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            className="bg-gray-200 hover:bg-[#5C0809] hover:scale-105 hover:text-white transition ease-in-out flex items-center justify-center py-1.5 px-2 rounded-lg"
          >
            {order === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>
        </div>
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center">No approved tickets available.</p>
      ) : (
        <div className="grid grid-cols-1 py-4 px-6 lg:py-0 lg:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onClick={() => openBookingModal(ticket)}
            />
          ))}
        </div>
      )}


      {modalOpen && selectedTicket && (
        <BookingModal
          ticket={selectedTicket}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={() => setModalOpen(false)}
        >
          <Elements stripe={stripePromise}>


            <CheckoutForm
              ticket={selectedTicket}
              quantity={quantity}
              onPaymentSuccess={() => {
                axios.post("https://book-my-seat-server.vercel.app/bookings", {
                  ticketId: selectedTicket._id,
                  quantity,
                  status: "Paid",
                  departure: selectedTicket.departure,
                }).then(() => {


                  setTickets((prev) =>
                    prev.map((t) =>
                      t._id === selectedTicket._id
                        ? { ...t, quantity: t.quantity - quantity }
                        : t
                    )
                  );
                  setModalOpen(false);
                  alert("Booking successful!");
                });
              }}
            />
          </Elements>
        </BookingModal>
      )}
    </div>
  );
};

export default AllTickets;
