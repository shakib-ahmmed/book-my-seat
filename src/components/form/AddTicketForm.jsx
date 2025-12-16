import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";

const PERKS_OPTIONS = ["AC", "WiFi", "Breakfast", "TV", "Snacks"];

const AddTicketForm = () => {
    const { user } = useAuth();
    const [preview, setPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const imageFile = watch("imageFile");

    // Preview image when selected
    if (imageFile && imageFile[0]) {
        const file = imageFile[0];
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    }

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            const imageFile = data.imageFile[0];
            const formData = new FormData();
            formData.append("image", imageFile);

            // Upload image to imgbb
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
                { method: "POST", body: formData }
            );

            if (!res.ok) throw new Error("Image upload failed");
            const imgData = await res.json();

            const selectedPerks = PERKS_OPTIONS.filter(perk => data.perks?.includes(perk));

            const ticketData = {
                title: data.title,
                from: data.from,
                to: data.to,
                transportType: data.transportType,
                price: Number(data.price),
                quantity: Number(data.quantity),
                departure: data.departure,
                perks: selectedPerks,
                image: imgData.data.url,
                vendorName: user?.displayName || "Unknown Vendor",
                vendorEmail: user?.email || "",
                status: "pending",
            };

            // Send ticket to backend
            const ticketRes = await fetch("http://localhost:5000/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ticketData),
            });

            if (!ticketRes.ok) throw new Error("Ticket upload failed");

            toast.success("Ticket added successfully!");
            reset();
            setPreview(null);
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to add ticket");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-[#b0bdc0] p-6 shadow-xl rounded-3xl mt-10">
            <h2 className="text-3xl font-bold mb-6 text-[#5b0809]">Add New Ticket</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Ticket Title */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Ticket Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                        placeholder="Dhaka to Cox's Bazar Luxury Bus"
                    />
                    <p className="text-red-600 text-sm">{errors.title?.message}</p>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Ticket Image</label>
                    <input
                        type="file"
                        {...register("imageFile", { required: "Image is required" })}
                        accept="image/*"
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-full max-h-64 object-cover rounded-lg shadow-md"
                        />
                    )}
                </div>

                {/* From / To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#5b0809]">From</label>
                        <input
                            {...register("from", { required: "From location is required" })}
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                            placeholder="Dhaka"
                        />
                        <p className="text-red-600 text-sm">{errors.from?.message}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-[#5b0809]">To</label>
                        <input
                            {...register("to", { required: "To location is required" })}
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                            placeholder="Cox's Bazar"
                        />
                        <p className="text-red-600 text-sm">{errors.to?.message}</p>
                    </div>
                </div>

                {/* Transport Type */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Transport Type</label>
                    <select
                        {...register("transportType", { required: "Transport type is required" })}
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                    >
                        <option value="">Select</option>
                        <option>Bus</option>
                        <option>Train</option>
                        <option>Plane</option>
                        <option>Ship</option>
                    </select>
                    <p className="text-red-600 text-sm">{errors.transportType?.message}</p>
                </div>

                {/* Price / Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#5b0809]">Price</label>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                            placeholder="1200"
                        />
                        <p className="text-red-600 text-sm">{errors.price?.message}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-[#5b0809]">Quantity</label>
                        <input
                            type="number"
                            {...register("quantity", { required: "Quantity is required" })}
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                            placeholder="10"
                        />
                        <p className="text-red-600 text-sm">{errors.quantity?.message}</p>
                    </div>
                </div>

                {/* Departure */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Departure Date & Time</label>
                    <input
                        type="datetime-local"
                        {...register("departure", { required: "Departure date & time required" })}
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                    />
                    <p className="text-red-600 text-sm">{errors.departure?.message}</p>
                </div>

                {/* Perks Checkboxes */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Perks</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {PERKS_OPTIONS.map((perk) => (
                            <label key={perk} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={perk}
                                    {...register("perks")}
                                    className="w-4 h-4"
                                />
                                {perk}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Vendor Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#5b0809]">Vendor Name</label>
                        <input
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md bg-gray-200"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-[#5b0809]">Vendor Email</label>
                        <input
                            value={user?.email || ""}
                            readOnly
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md bg-gray-200"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 text-white font-bold rounded-xl transition-all 
                        ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#ba0c10] hover:bg-[#5b0809] cursor-pointer"}`}
                >
                    {submitting ? "Adding..." : "Add Ticket"}
                </button>
            </form>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default AddTicketForm;
