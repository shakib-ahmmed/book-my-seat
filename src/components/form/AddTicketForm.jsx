import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";




const schema = yup.object({
    title: yup.string().required("Title is required"),
    image: yup.string().url("Invalid image URL").required("Image is required"),
    from: yup.string().required("From location is required"),
    to: yup.string().required("To location is required"),
    transportType: yup
        .string()
        .oneOf(["Bus", "Train", "Plane", "Ship"], "Invalid transport type")
        .required("Transport type is required"),
    price: yup.number().positive().required("Price is required"),
    quantity: yup.number().integer().min(0).required("Quantity is required"),
    departure: yup
        .string()
        .required("Departure date & time required"),
    perks: yup.string(),
});

const AddTicketForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Submit Handler
    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            perks: data.perks
                ? data.perks.split(",").map((p) => p.trim())
                : [],
        };

        fetch("http://localhost:5000/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Ticket added successfully!");
                reset();
            })
            .catch(() => toast.error("Failed to add ticket"));
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-5">Add New Ticket</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="font-medium">Ticket Title</label>
                    <input
                        {...register("title")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Dhaka to Cox's Bazar Luxury Bus"
                    />
                    <p className="text-red-500 text-sm">{errors.title?.message}</p>
                </div>

                {/* Image */}
                <div>
                    <label className="font-medium">Image URL</label>
                    <input
                        {...register("image")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-red-500 text-sm">{errors.image?.message}</p>
                </div>

                {/* From */}
                <div>
                    <label className="font-medium">From</label>
                    <input
                        {...register("from")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Dhaka"
                    />
                    <p className="text-red-500 text-sm">{errors.from?.message}</p>
                </div>

                {/* To */}
                <div>
                    <label className="font-medium">To</label>
                    <input
                        {...register("to")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Cox's Bazar"
                    />
                    <p className="text-red-500 text-sm">{errors.to?.message}</p>
                </div>

                {/* Transport Type */}
                <div>
                    <label className="font-medium">Transport Type</label>
                    <select
                        {...register("transportType")}
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select</option>
                        <option>Bus</option>
                        <option>Train</option>
                        <option>Plane</option>
                        <option>Ship</option>
                    </select>
                    <p className="text-red-500 text-sm">
                        {errors.transportType?.message}
                    </p>
                </div>

                {/* Price */}
                <div>
                    <label className="font-medium">Price (Per Unit)</label>
                    <input
                        type="number"
                        {...register("price")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="1200"
                    />
                    <p className="text-red-500 text-sm">{errors.price?.message}</p>
                </div>

                {/* Quantity */}
                <div>
                    <label className="font-medium">Quantity</label>
                    <input
                        type="number"
                        {...register("quantity")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="10"
                    />
                    <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
                </div>

                {/* Departure */}
                <div>
                    <label className="font-medium">Departure Date & Time</label>
                    <input
                        type="datetime-local"
                        {...register("departure")}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <p className="text-red-500 text-sm">{errors.departure?.message}</p>
                </div>

                {/* Perks */}
                <div>
                    <label className="font-medium">Perks (Comma Separated)</label>
                    <input
                        {...register("perks")}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="WiFi, AC, TV, Snacks"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                    Add Ticket
                </button>
            </form>
        </div>
    );
};

export default AddTicketForm;
