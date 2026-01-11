import React, { useEffect, useState } from "react";

const stats = [
    { id: 1, label: "Tickets Sold", value: 25000, suffix: "K+" },
    { id: 2, label: "Happy Customers", value: 15000, suffix: "K+" },
    { id: 3, label: "Cities Covered", value: 50, suffix: "+" },
    { id: 4, label: "On-time Departures", value: 99, suffix: "%" },
];

const Stats = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        const duration = 2000; // 2 seconds animation
        const intervalTime = 30; // update every 30ms
        const steps = duration / intervalTime;
        const increments = stats.map((s) => s.value / steps);

        const interval = setInterval(() => {
            setCounts((prev) =>
                prev.map((count, i) => {
                    const next = count + increments[i];
                    return next >= stats[i].value ? stats[i].value : next;
                })
            );
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 px-4 md:px-12 bg-base-100 dark:bg-base-200 transition-colors duration-500 text-center w-full">
            <h2 className="text-3xl font-bold mb-12 text-yellow-400text-4xl md:text-5xl font-extrabold text-center mb-12 text-black dark:text-[#FDDB1A]">Our Achievements</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-8xl mx-auto">
                {stats.map((s, idx) => (
                    <div
                        key={s.id}
                        className="bg-[#2C2C2C] dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center"
                    >
                        <p className="text-3xl font-bold text-yellow-400">
                            {Math.floor(counts[idx]).toLocaleString()}
                            {s.suffix}
                        </p>
                        <p className="mt-2 text-white dark:text-white">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
