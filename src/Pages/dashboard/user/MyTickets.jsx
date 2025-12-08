import { Calendar, MapPin, Ticket, Bus, Plane, Train, ArrowRight } from "lucide-react";

const MyTickets = () => {
  // Example ticket data (replace with API data)
  const myTickets = [
    {
      id: "TCK-98342",
      title: "Dhaka to Chittagong",
      from: "Dhaka",
      to: "Chittagong",
      transport: "Bus",
      date: "2025-01-23",
      time: "10:30 AM",
      price: 850,
      qty: 2,
      perks: ["AC Coach", "Water Bottle", "WiFi"],
    },
    {
      id: "TCK-44720",
      title: "Dhaka to Cox's Bazar",
      from: "Dhaka",
      to: "Cox's Bazar",
      transport: "Plane",
      date: "2025-02-12",
      time: "07:45 AM",
      price: 4800,
      qty: 1,
      perks: ["Window Seat", "Luggage 20kg"],
    },
  ];

  const getTransportIcon = (type) => {
    switch (type) {
      case "Bus":
        return <Bus className="w-5 h-5 text-indigo-600" />;
      case "Plane":
        return <Plane className="w-5 h-5 text-indigo-600" />;
      case "Train":
        return <Train className="w-5 h-5 text-indigo-600" />;
      default:
        return <Ticket className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-2xl transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-indigo-700">
                {ticket.title}
              </h2>
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                {ticket.transport}
              </span>
            </div>

            {/* Locations */}
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <p className="font-medium">
                {ticket.from} <ArrowRight className="inline w-4 h-4" /> {ticket.to}
              </p>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-3 mt-3 text-gray-600">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <p>
                {ticket.date} – <span className="font-medium">{ticket.time}</span>
              </p>
            </div>

            {/* Perks */}
            <div className="mt-4 flex flex-wrap gap-2">
              {ticket.perks.map((perk, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {perk}
                </span>
              ))}
            </div>

            {/* Price & Quantity */}
            <div className="flex justify-between items-center mt-5 border-t pt-4">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-gray-800">
                  ৳{ticket.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Tickets</p>
                <p className="text-xl font-semibold text-indigo-600">
                  {ticket.qty}
                </p>
              </div>
            </div>

            {/* See Details Button */}
            <button className="w-full mt-5 bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-lg transition">
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
