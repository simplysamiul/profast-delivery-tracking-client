import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    FaMoneyBillWave,
    FaWallet,
    FaClock,
    FaChartPie,
} from "react-icons/fa";
import Loader from "../../Shared/Loader/Loader";

const COLORS = ["#7C3AED", "#FBBF24", "#10B981", "#F472B6"];

const MyEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // === Load completed parcels ===
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["riderEarnings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/rider/completedParcels?email=${user?.email}`
            );
            return res.data;
        },
    });


    // === Calculate earning stats using useMemo ===
    const stats = useMemo(() => {
        if (!parcels.length)
            return { total: 0, cashedOut: 0, pending: 0, daily: 0, weekly: 0, monthly: 0 };

        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        let total = 0,
            cashedOut = 0,
            pending = 0,
            daily = 0,
            weekly = 0,
            monthly = 0;

        parcels.forEach((p) => {
            const cost = Number(p.deliveryCharge) || 0;
            const earning = p.senderDistrict === p.receiverDistrict ? cost * 0.8 : cost * 0.3;
            total += earning;

            if (p.cashoutStatus === "cashOut") cashedOut += earning;
            else pending += earning;

            const date = new Date(p.deliveryDate);
            if (isNaN(date)) return;
            if (date.toDateString() === new Date().toDateString()) daily += earning;
            if (date >= startOfWeek) weekly += earning;
            if (date >= startOfMonth) monthly += earning;
        });

        return { total, cashedOut, pending, daily, weekly, monthly };
    }, [parcels]); //  Recalculate only when parcels change

    const chartData = [
        { name: "Cashed Out", value: stats.cashedOut },
        { name: "Pending", value: stats.pending },
    ];

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 font-semibold">
                <Loader />
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            <h2 className="text-3xl font-bold text-center text-deepG">
                My Earnings Dashboard
            </h2>

            {/* === Earnings Summary Cards === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        icon: <FaMoneyBillWave className="text-indigo-500 text-3xl" />,
                        label: "Total Earned",
                        value: stats.total,
                    },
                    {
                        icon: <FaWallet className="text-yellow-500 text-3xl" />,
                        label: "Cashed Out",
                        value: stats.cashedOut,
                    },
                    {
                        icon: <FaClock className="text-pink-500 text-3xl" />,
                        label: "Pending",
                        value: stats.pending,
                    },
                    {
                        icon: <FaChartPie className="text-green-500 text-3xl" />,
                        label: "Monthly Income",
                        value: stats.monthly,
                    },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="p-5 rounded-2xl backdrop-blur-lg border border-gray-200 bg-white/70 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-3"
                    >
                        {item.icon}
                        <h3 className="text-deepG text-lg font-semibold" >{item.label}</h3>
                        <p className="text-2xl font-bold text-deepG">৳{item.value.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* === Pie Chart Section === */}
            <div className="w-full h-[400px] bg-white/70 border border-gray-200 rounded-2xl shadow-md backdrop-blur-md p-6">
                <h3 className="text-center text-deepG font-bold mb-4 text-lg">
                    Earnings Breakdown
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: "rgba(255,255,255,0.9)",
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MyEarnings;
