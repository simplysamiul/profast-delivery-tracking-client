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

const UserDashboard = () => {
  // 🔹 Fake User Data
  const userInfo = {
    name: "Samiul Islam",
    totalParcels: 56,
    pending: 10,
    inTransit: 18,
    delivered: 25,
    cancelled: 3,
    totalSpent: 2100,
    monthlyParcels: [
      { month: "Jan", parcels: 3 },
      { month: "Feb", parcels: 6 },
      { month: "Mar", parcels: 4 },
      { month: "Apr", parcels: 5 },
      { month: "May", parcels: 8 },
      { month: "Jun", parcels: 10 },
      { month: "Jul", parcels: 6 },
      { month: "Aug", parcels: 5 },
      { month: "Sep", parcels: 4 },
      { month: "Oct", parcels: 5 },
    ],
    deliveryTrend: [
      { day: "Mon", delivered: 3 },
      { day: "Tue", delivered: 5 },
      { day: "Wed", delivered: 4 },
      { day: "Thu", delivered: 7 },
      { day: "Fri", delivered: 6 },
      { day: "Sat", delivered: 3 },
      { day: "Sun", delivered: 2 },
    ],
  };

  // 🥧 Pie Chart Data
  const parcelStatusData = [
    { name: "Pending", value: userInfo.pending },
    { name: "In Transit", value: userInfo.inTransit },
    { name: "Delivered", value: userInfo.delivered },
    { name: "Cancelled", value: userInfo.cancelled },
  ];

  const COLORS = ["#FACC15", "#3B82F6", "#22C55E", "#EF4444"];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-deepG mb-2">
          User Dashboard
        </h1>
        <p className="text-gray-500 text-lg">
          Welcome back, {userInfo.name}! 👋
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-600">Pending</h3>
          <p className="text-3xl font-bold mt-2">{userInfo.pending}</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-blue-600">In Transit</h3>
          <p className="text-3xl font-bold mt-2">{userInfo.inTransit}</p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-green-600">Delivered</h3>
          <p className="text-3xl font-bold mt-2">{userInfo.delivered}</p>
        </div>

        <div className="bg-red-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-lg font-semibold text-red-600">Cancelled</h3>
          <p className="text-3xl font-bold mt-2">{userInfo.cancelled}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Parcel Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Parcel Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={parcelStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {parcelStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Parcels Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Monthly Parcels Sent
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userInfo.monthlyParcels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="parcels" fill="#3B82F6" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Delivery Trend Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Weekly Delivery Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userInfo.deliveryTrend}>
            <defs>
              <linearGradient id="colorDel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="delivered"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorDel)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Spending Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">Total Spent</h2>
        <p className="text-4xl font-extrabold">BDT - {userInfo.totalSpent} /-</p>
        <p className="text-sm opacity-90 mt-2">
          Thanks for trusting us, {userInfo.name}!
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
