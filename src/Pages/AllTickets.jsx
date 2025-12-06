import { useLocation } from "react-router-dom";

function AllTickets() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type"); // "bus", "train", "launch", "plane"

  return (
    <div>
      <h1>{type ? `${type.toUpperCase()} Tickets` : "All Tickets"}</h1>
      {/* Filter tickets by type */}
    </div>
  );
}

export default AllTickets;
