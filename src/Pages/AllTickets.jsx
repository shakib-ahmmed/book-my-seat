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

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);

      // Map priceRange to minPrice and maxPrice
      let minPrice = 0,
        maxPrice = 999999;
      switch (priceRange) {
        case "0-50":
          minPrice = 0;
          maxPrice = 50;
          break;
        case "51-100":
          minPrice = 51;
          maxPrice = 100;
          break;
        case "101-200":
          minPrice = 101;
          maxPrice = 200;
          break;
        case "201+":
          minPrice = 201;
          maxPrice = 999999;
          break;
        default:
          minPrice = 0;
          maxPrice = 999999;
      }

      try {
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

        const ticketsData = Array.isArray(data) ? data : data?.tickets || [];

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

  const openBookingModal = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setModalOpen(true);
  };

  const handleFilterChange = (filterType, value) => {
    setPage(1);
    if (filterType === "category") setCategory(value);
    if (filterType === "price") setPriceRange(value);
  };

  const clearFilters = () => {
    setCategory("");
    setPriceRange("all");
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };

  // Dark/Light theme styles
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const inputClass =
    "border rounded-lg px-3 py-1.5 text-sm " +
    (isDark ? "bg-[#3a2d2d] border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800");

  const labelClass = isDark ? "text-gray-200 text-sm font-medium" : "text-gray-700 text-sm font-medium";

  const btnClass =
    "btn font-semibold px-4 py-1.5 rounded-lg hover:scale-105 transition ease-in-out " +
    (isDark ? "bg-[#5C0809] text-white" : "bg-[#5C0809] text-white");

  return (
    <div className="lg:w-10/12 mx-auto py-10">
      <h1 className={`text-3xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-black"}`}>
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
            className={inputClass}
          />
          <button onClick={handleSearch} className={btnClass}>
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className={inputClass}
          >
            <option value="">All Categories</option>
            <option value="concert">Bus</option>
            <option value="theater">Train</option>
            <option value="sport">Plane</option>
          </select>

          {/* Price */}
          <select
            value={priceRange}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            className={inputClass}
          >
            <option value="all">All Prices</option>
            <option value="0-50">0 - 500</option>
            <option value="51-100">501 - 1000</option>
            <option value="101-200">1001 - 2000</option>
            <option value="201+">2001+</option>
          </select>

          <label className={labelClass}>Sort by:</label>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className={inputClass}
          >
            <option value="price">Price</option>
            <option value="departure">Departure Date</option>
          </select>

          <button
            onClick={() => {
              setOrder(order === "asc" ? "desc" : "asc");
              setPage(1);
            }}
            className={
              "flex items-center justify-center py-1.5 px-2 rounded-lg transition ease-in-out " +
              (isDark ? "bg-gray-700 text-white hover:bg-[#5C0809]" : "bg-gray-200 text-gray-800 hover:bg-[#5C0809] hover:text-white")
            }
          >
            {order === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>

          {(category || priceRange !== "all" || searchQuery) && (
            <button
              onClick={clearFilters}
              className={
                "px-3 py-1 rounded-lg text-sm transition " +
                (isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-300 text-gray-800 hover:bg-gray-400")
              }
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {category && <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-sm">Category: {category}</span>}
        {priceRange !== "all" && <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-sm">Price: {priceRange}</span>}
        {searchQuery && <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-sm">Search: {searchQuery}</span>}
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 && !loading ? (
        <p className={isDark ? "text-white text-center" : "text-gray-500 text-center"}>No tickets found.</p>
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
              return <TicketCard key={ticket._id || index} ticket={ticket} onClick={() => openBookingModal(ticket)} />;
            }
          })}
        </div>
      )}

      {loading && <LoadingSpinner />}

      {/* Booking Modal */}
      {modalOpen && selectedTicket && (
        <BookingModal ticket={selectedTicket} quantity={quantity} setQuantity={setQuantity} onClose={() => setModalOpen(false)}>
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
                      prev.map((t) => (t._id === selectedTicket._id ? { ...t, quantity: (t.quantity || 0) - quantity } : t))
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
