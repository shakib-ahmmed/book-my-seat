import { MapPin, ArrowRight, Bus, Train, Plane, Ship } from "lucide-react";
import { Link } from "react-router-dom";

const Ticket = ({ ticket }) => {
    const {
        id,
        image,
        title,
        from,
        to,
        transportType,
        price,
        quantity,
        perks,
        departure,
    } = ticket;

    const transportIcons = {
        bus: <Bus className="w-5 h-5" />,
        train: <Train className="w-5 h-5" />,
        plane: <Plane className="w-5 h-5" />,
        ship: <Ship className="w-5 h-5" />,
    };

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
            <img src={image} alt={title} className="w-full h-40 object-cover" />

            <div className="p-4 space-y-3">
                <h2 className="text-lg font-semibold">{title}</h2>

                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{from}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>{to}</span>
                </div>


                <div className="flex items-center gap-2 text-gray-700">
                    {transportIcons[transportType.toLowerCase()]}
                    <p className="capitalize">{transportType}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                    <p><span className="font-semibold">Price:</span> ${price}</p>
                    <p><span className="font-semibold">Qty:</span> {quantity}</p>
                </div>

                <div className="text-sm text-gray-600">
                    <span className="font-semibold">Perks:</span> {perks?.join(", ")}
                </div>


                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Departure:</span> {departure}
                </p>





                <Link
                    to={`/ticket/${id}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg mt-3 hover:bg-blue-700"
                >
                    See Details
                </Link>
            </div>
        </div>
    );
};

export default Ticket;
