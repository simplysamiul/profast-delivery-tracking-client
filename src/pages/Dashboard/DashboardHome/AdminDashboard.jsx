import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  // 🔹 Fake dashboard data (only edited monthlyDelivered for the trend)
  const overviewData = {
    parcelStats: {
      total: 120,
      pending: 25,
      inTransit: 40,
      delivered: 50,
      assigned: 9,
    },
    ridersStats: {
      total: 20,
      verified: 15,
      busy: 8,
      available: 12,
    },
    financialStats: {
      totalRevenue: 12500,
    },
    graphs: {
      monthlyRevenue: [
        { _id: "January", totalAmount: 1500 },
        { _id: "February", totalAmount: 2300 },
        { _id: "March", totalAmount: 1800 },
        { _id: "April", totalAmount: 2600 },
        { _id: "May", totalAmount: 2100 },
        { _id: "June", totalAmount: 2200 },
        { _id: "July", totalAmount: 2400 },
        { _id: "August", totalAmount: 2800 },
        { _id: "September", totalAmount: 3200 },
        { _id: "October", totalAmount: 2950 },
      ],
      // ✅ Fake data for delivered parcel trend
      monthlyDelivered: [
        { _id: "January", totalDelivered: 32 },
        { _id: "February", totalDelivered: 45 },
        { _id: "March", totalDelivered: 52 },
        { _id: "April", totalDelivered: 48 },
        { _id: "May", totalDelivered: 60 },
        { _id: "June", totalDelivered: 66 },
        { _id: "July", totalDelivered: 72 },
        { _id: "August", totalDelivered: 68 },
        { _id: "September", totalDelivered: 74 },
        { _id: "October", totalDelivered: 79 },
      ],
    },
  };

  const { parcelStats, ridersStats, financialStats, graphs } = overviewData;

  const parcelPieData = [
    { name: "Pending", value: parcelStats.pending },
    { name: "In Transit", value: parcelStats.inTransit },
    { name: "Delivered", value: parcelStats.delivered },
    { name: "Assigned", value: parcelStats.assigned },
  ];

  const riderBarData = [
    { name: "Available Riders", value: ridersStats.available },
    { name: "Busy Riders", value: ridersStats.busy },
  ];

  const COLORS = ["#FFB74D", "#42A5F5", "#66BB6A", "#AB47BC"];

  return (
    <div className="p-6 max-w-8xl mx-auto space-y-10">
      {/* Dashboard Header */}
      <h1 className="text-4xl font-extrabold text-deepG mb-6 text-center">
        Admin Dashboard Overview
      </h1>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl shadow-sm text-center">
          <h3 className="text-xl font-semibold text-indigo-700">Total Parcels</h3>
          <p className="text-3xl font-bold mt-2">{parcelStats.total}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-sm text-center">
          <h3 className="text-xl font-semibold text-green-700">Total Riders</h3>
          <p className="text-3xl font-bold mt-2">{ridersStats.total}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow-sm text-center">
          <h3 className="text-xl font-semibold text-yellow-700">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${financialStats.totalRevenue}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Parcel Status - Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Parcel Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={parcelPieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {parcelPieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Rider Availability - Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Rider Availability
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riderBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#42A5F5" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue and Delivery Trend */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Monthly Revenue - Area Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graphs.monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="_id" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalAmount"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Delivered Parcels Trend - Area Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Delivered Parcels Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graphs.monthlyDelivered}>
              <defs>
                <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="_id" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalDelivered"
                stroke="#16A34A"
                fillOpacity={1}
                fill="url(#colorDelivered)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
