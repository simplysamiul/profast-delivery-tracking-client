import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import useAuth from "../../../hooks/useAuth";

const RiderDashboard = () => {

    const {user} = useAuth();
  // 🔹 Fake Rider Overview Data
  const riderInfo = {
    name: "John Doe",
    totalDeliveries: 210,
    completedDeliveries: 190,
    cancelledDeliveries: 20,
    averageRating: 4.7,
    totalEarnings: 8450,
    monthlyEarnings: [
      { month: "Jan", earnings: 650 },
      { month: "Feb", earnings: 800 },
      { month: "Mar", earnings: 780 },
      { month: "Apr", earnings: 950 },
      { month: "May", earnings: 1000 },
      { month: "Jun", earnings: 850 },
      { month: "Jul", earnings: 970 },
      { month: "Aug", earnings: 1100 },
      { month: "Sep", earnings: 920 },
      { month: "Oct", earnings: 1120 },
    ],
    dailyPerformance: [
      { day: "Mon", deliveries: 8 },
      { day: "Tue", deliveries: 9 },
      { day: "Wed", deliveries: 10 },
      { day: "Thu", deliveries: 7 },
      { day: "Fri", deliveries: 12 },
      { day: "Sat", deliveries: 15 },
      { day: "Sun", deliveries: 6 },
    ],
  };

  // 🔸 Pie Chart Data
  const deliveryStatusData = [
    { name: "Completed", value: riderInfo.completedDeliveries },
    { name: "Cancelled", value: riderInfo.cancelledDeliveries },
  ];

  const COLORS = ["#4CAF50", "#EF4444"];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-deepG mb-2">
          Rider Dashboard
        </h1>
        <p className="text-gray-500 text-lg">Welcome back, {user.displayName}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-indigo-700">Total Deliveries</h3>
          <p className="text-3xl font-bold mt-2">{riderInfo.totalDeliveries}</p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-green-700">Completed</h3>
          <p className="text-3xl font-bold mt-2">{riderInfo.completedDeliveries}</p>
        </div>

        <div className="bg-red-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-red-700">Cancelled</h3>
          <p className="text-3xl font-bold mt-2">{riderInfo.cancelledDeliveries}</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-700">Rating</h3>
          <p className="text-3xl font-bold mt-2">{riderInfo.averageRating} ⭐</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Delivery Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Delivery Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveryStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {deliveryStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Earnings Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Monthly Earnings
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riderInfo.monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#6366F1" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Trend Area Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Weekly Delivery Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={riderInfo.dailyPerformance}>
            <defs>
              <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="deliveries"
              stroke="#22C55E"
              fillOpacity={1}
              fill="url(#colorPerf)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Total Earnings Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">Total Earnings</h2>
        <p className="text-4xl font-extrabold">${riderInfo.totalEarnings}</p>
        <p className="text-sm opacity-90 mt-2">
          Keep up the great work, {riderInfo.name}! 🚀
        </p>
      </div>
    </div>
  );
};

export default RiderDashboard;
