import React, { useState, useEffect, useRef, useCallback } from "react";
import TicketCard from "../components/Home/TicketCard";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import LoadingSpinner from "../components/LoadingSpinner";
import CheckoutForm from "../components/form/CheckoutForm";
import BookingModal from "../components/model/BookingModal";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_KEY_HERE");

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");

  // Filters
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  // Pagination / infinite scroll
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const observer = useRef();

  const lastTicketElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch tickets with filters, search, sorting
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        // Map priceRange to minPrice/maxPrice
        let minPrice = 0,
          maxPrice = 999999;
        switch (priceRange) {
          case "0-50":
            minPrice = 0;
            maxPrice = 500;
            break;
          case "51-100":
            minPrice = 501;
            maxPrice = 1000;
            break;
          case "101-200":
            minPrice = 1001;
            maxPrice = 2000;
            break;
          case "201+":
            minPrice = 2001;
            maxPrice = 999999;
            break;
          default:
            minPrice = 0;
            maxPrice = 999999;
        }

        const queryParams = new URLSearchParams({
          search: searchQuery,
          category,
          minPrice,
          maxPrice,
          sortBy,
          order,
          page,
          limit: 8,
        }).toString();

        const res = await fetch(
          `https://book-my-seat-server.vercel.app/tickets?${queryParams}`
        );
        const data = await res.json();

        let ticketsData = [];
        if (Array.isArray(data)) {
          ticketsData = data;
        } else if (data && Array.isArray(data.tickets)) {
          ticketsData = data.tickets;
        }

        if (page === 1) {
          setTickets(ticketsData);
        } else {
          setTickets((prev) => [...prev, ...ticketsData]);
        }

        setHasMore(ticketsData.length === 8);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setTickets([]);
        setHasMore(false);
      }
      setLoading(false);
    };

    fetchTickets();
  }, [searchQuery, category, priceRange, sortBy, order, page]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(search);
  };

  const handleFilterChange = (type, value) => {
    setPage(1);
    if (type === "category") setCategory(value);
    if (type === "price") setPriceRange(value);
  };

  const clearFilters = () => {
    setCategory("");
    setPriceRange("all");
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };

  const openBookingModal = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setModalOpen(true);
  };

  return (
    <div className="lg:w-10/12 mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {searchQuery ? `Search: ${searchQuery}` : "All Tickets"}
      </h1>

      {/* Search + Filters + Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 gap-2">
          <input
            type="text"
            placeholder="Search by ticket title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 w-full text-sm bg-white dark:bg-[#3a2d2d] text-gray-800 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="btn bg-[#5C0809] text-white font-semibold px-4 hover:scale-105 transition ease-in-out flex items-center justify-center py-1.5 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-[#3a2d2d] text-gray-800 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="concert">Bus</option>
            <option value="theater">Train</option>
            <option value="sport">Plane</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-[#3a2d2d] text-gray-800 dark:text-white"
          >
            <option value="all">All Prices</option>
            <option value="0-50">0 - 500</option>
            <option value="51-100">501 - 1000</option>
            <option value="101-200">1001 - 2000</option>
            <option value="201+">2001+</option>
          </select>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Sort by:</label>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-[#3a2d2d] text-gray-800 dark:text-white"
          >
            <option value="price">Price</option>
            <option value="departure">Departure Date</option>
          </select>

          <button
            onClick={() => {
              setOrder(order === "asc" ? "desc" : "asc");
              setPage(1);
            }}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-[#5C0809] hover:scale-105 hover:text-white transition ease-in-out flex items-center justify-center py-1.5 px-2 rounded-lg text-gray-800 dark:text-white"
          >
            {order === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>

          {(category || priceRange !== "all" || searchQuery) && (
            <button
              onClick={clearFilters}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition px-3 py-1 rounded-lg text-sm text-gray-800 dark:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 && !loading ? (
        <p className="text-gray-500 dark:text-gray-300 text-center mt-6">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 py-4 px-6 lg:py-0 lg:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tickets.map((ticket, index) => {
            if (tickets.length === index + 1) {
              return (
                <div ref={lastTicketElementRef} key={ticket._id || index}>
                  <TicketCard ticket={ticket} onClick={() => openBookingModal(ticket)} />
                </div>
              );
            } else {
              return (
                <TicketCard
                  key={ticket._id || index}
                  ticket={ticket}
                  onClick={() => openBookingModal(ticket)}
                />
              );
            }
          })}
        </div>
      )}

      {loading && <LoadingSpinner />}

      {/* Booking Modal */}
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
                axios
                  .post("https://book-my-seat-server.vercel.app/bookings", {
                    ticketId: selectedTicket._id,
                    quantity,
                    status: "Paid",
                    departure: selectedTicket.departure,
                  })
                  .then(() => {
                    setTickets((prev) =>
                      prev.map((t) =>
                        t._id === selectedTicket._id
                          ? { ...t, quantity: (t.quantity || 0) - quantity }
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
