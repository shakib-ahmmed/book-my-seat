import React, { useState, useEffect, useRef, useCallback } from "react";
import TicketCard from "../components/Home/TicketCard";
import LoadingSpinner from "../components/LoadingSpinner";
import BookingModal from "../components/model/BookingModal";
import CheckoutForm from "../components/form/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("YOUR_STRIPE_KEY_HERE");

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const observer = useRef();
  const lastTicketRef = useCallback(
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

  const getPriceRange = () => {
    switch (priceRange) {
      case "0-50":
        return { minPrice: 0, maxPrice: 500 };
      case "51-100":
        return { minPrice: 501, maxPrice: 1000 };
      case "101-200":
        return { minPrice: 1001, maxPrice: 2000 };
      case "201+":
        return { minPrice: 2001 };
      default:
        return {};
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const { minPrice, maxPrice } = getPriceRange();

        const params = new URLSearchParams({
          search: searchQuery,
          category,
          sortBy,
          order,
          page,
          limit: 8,
        });

        if (minPrice !== undefined) params.append("minPrice", minPrice);
        if (maxPrice !== undefined) params.append("maxPrice", maxPrice);

        const res = await fetch(
          `https://book-my-seat-server.vercel.app/tickets?${params}`
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.tickets || [];

        setTickets((prev) =>
          page === 1 ? list : [...prev, ...list]
        );

        setHasMore(list.length === 8);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [searchQuery, category, priceRange, sortBy, order, page]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(search);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchQuery("");
    setCategory("");
    setPriceRange("all");
    setPage(1);
  };

  const openBookingModal = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setModalOpen(true);
  };

  return (
    <div className="lg:w-10/12 mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {searchQuery ? `Search: ${searchQuery}` : "All Tickets"}
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 gap-2">
          <input
            type="text"
            placeholder="Search by ticket title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 w-full text-black dark:text-white bg-white dark:bg-[#1f1f1f] placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="bg-[#5C0809] text-white font-semibold px-4 hover:scale-105 transition ease-in-out flex items-center justify-center py-1.5 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center pb-7 gap-2 flex-wrap">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm text-black dark:text-white bg-white dark:bg-[#1f1f1f]"
          >
            <option value="">All Categories</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
            <option value="Ship">Ship</option>
          </select>

          {/* Price Range */}

          <select
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm text-black dark:text-white bg-white dark:bg-[#1f1f1f]"
          >
            <option value="all">All Prices</option>
            <option value="0-50">0 - 500</option>
            <option value="51-100">501 - 1000</option>
            <option value="101-200">1001 - 2000</option>
            <option value="201+">2001+</option>
          </select>

          {/* Sort */}

          <label className="text-sm font-medium">
            Sort by:
          </label>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm text-black dark:text-white bg-white dark:bg-[#1f1f1f]"
          >
            <option value="price">Price</option>
            <option value="departure">Departure Date</option>
          </select>

          {/* Order Button */}
          <button
            onClick={() => {
              setOrder(order === "asc" ? "desc" : "asc");
              setPage(1);
            }}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-[#5C0809] hover:text-white transition ease-in-out flex items-center justify-center py-1.5 px-2 rounded-lg text-black dark:text-white"
          >
            {order === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>

          {/* Clear Filters */}
          {(category || priceRange !== "all" || searchQuery) && (
            <button
              onClick={clearFilters}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition px-3 py-1 rounded-lg text-sm text-black dark:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 && !loading ? (
        <p className="text-gray-500 text-center dark:text-gray-300">
          No tickets found.
        </p>
      ) : (
        <div className="grid grid-cols-1 py-4 px-6 lg:py-0 lg:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tickets.map((ticket, index) => {
            if (tickets.length === index + 1) {
              return (
                <div ref={lastTicketRef} key={ticket._id || index}>
                  <TicketCard ticket={ticket} onClick={() => openBookingModal(ticket)} />
                </div>
              );
            }
            return (
              <TicketCard
                key={ticket._id || index}
                ticket={ticket}
                onClick={() => openBookingModal(ticket)}
              />
            );
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
