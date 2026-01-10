import React from "react";

const stats = [
    { id: 1, label: "Tickets Sold", value: "25K+" },
    { id: 2, label: "Happy Customers", value: "15K+" },
    { id: 3, label: "Cities Covered", value: "50+" },
    { id: 4, label: "On-time Departures", value: "99%" },
];

const Stats = () => {
    return (
        <section className="py-16 px-4 md:px-12 text-center bg-gray-100 dark:bg-[#111]">
            <h2 className="text-3xl font-bold mb-12">Our Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map(s => (
                    <div key={s.id} className="bg-[#2C2C2C] dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
                        <p className="text-3xl font-bold text-yellow-400">{s.value}</p>
                        <p className="mt-2">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
