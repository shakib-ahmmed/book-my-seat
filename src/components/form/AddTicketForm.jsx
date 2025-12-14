import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object({
    title: yup.string().required("Title is required"),
    imageFile: yup
        .mixed()
        .required("Image file is required")
        .test("fileType", "Only image files are allowed", (value) => {
            return (
                value &&
                value[0] &&
                ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
            );
        }),
    from: yup.string().required("From location is required"),
    to: yup.string().required("To location is required"),
    transportType: yup
        .string()
        .oneOf(["Bus", "Train", "Plane", "Ship"], "Invalid transport type")
        .required("Transport type is required"),
    price: yup.number().positive().required("Price is required"),
    quantity: yup.number().integer().min(0).required("Quantity is required"),
    departure: yup.string().required("Departure date & time required"),
    perks: yup.string(),
});

const AddTicketForm = () => {
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const imageFile = watch("imageFile");

   
    if (imageFile && imageFile[0]) {
        const file = imageFile[0];
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    }

    const onSubmit = async (data) => {
        try {
            const imageFile = data.imageFile[0];

            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); 

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
                { method: "POST", body: formData }
            );

            if (!res.ok) throw new Error("Image upload failed");
            const imgData = await res.json();

            const formattedData = {
                ...data,
                image: imgData.secure_url,
                perks: data.perks ? data.perks.split(",").map((p) => p.trim()) : [],
            };

            const ticketRes = await fetch("http://localhost:5000/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (!ticketRes.ok) throw new Error("Ticket upload failed");

            toast.success("Ticket added successfully!");
            reset();
            setPreview(null);
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to add ticket");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-[#b0bdc0] p-6 shadow-xl rounded-3xl mt-10">
            <h2 className="text-3xl font-bold mb-6  text-[#5b0809]">
                Add New Ticket
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Ticket Title */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Ticket Title</label>
                    <input
                        {...register("title")}
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fddb1a]"
                        placeholder="Dhaka to Cox's Bazar Luxury Bus"
                    />
                    <p className="text-red-600 text-sm">{errors.title?.message}</p>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Ticket Image</label>
                    <input
                        type="file"
                        {...register("imageFile")}
                        accept="image/*"
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                    />
                    <p className="text-red-600 text-sm">{errors.imageFile?.message}</p>
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-full max-h-64 object-cover rounded-lg shadow-md"
                        />
                    )}
                </div>

                {/* From and To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#5b0809]">From</label>
                        <input
                            {...register("from")}
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                            placeholder="Dhaka"
                        />
                        <p className="text-red-600 text-sm">{errors.from?.message}</p>
                    </div>

                    <div>
                        <label className="font-semibold text-[#5b0809]">To</label>
                        <input
                            {...register("to")}
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
                        {...register("transportType")}
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

                {/* Price & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#5b0809]">Price</label>
                        <input
                            type="number"
                            {...register("price")}
                            className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                            placeholder="1200"
                        />
                        <p className="text-red-600 text-sm">{errors.price?.message}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-[#5b0809]">Quantity</label>
                        <input
                            type="number"
                            {...register("quantity")}
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
                        {...register("departure")}
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                    />
                    <p className="text-red-600 text-sm">{errors.departure?.message}</p>
                </div>

                {/* Perks */}
                <div>
                    <label className="font-semibold text-[#5b0809]">Perks (Comma Separated)</label>
                    <input
                        {...register("perks")}
                        className="w-full border border-[#615d5e] px-3 py-2 rounded-md"
                        placeholder="WiFi, AC, TV, Snacks"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#ba0c10] hover:bg-[#5b0809] text-white font-bold rounded-xl transition-all"
                >
                    Add Ticket
                </button>
            </form>

            {/* Toast notifications */}
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default AddTicketForm;
