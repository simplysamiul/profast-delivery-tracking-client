import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaMotorcycle,
  FaTruckMoving,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const stages = [
  { id: "Parcel_created", label: "Parcel Created", icon: <FaBoxOpen /> },
  { id: "payment_done", label: "Payment Done", icon: <FaMoneyBillWave /> },
  { id: "rider_assigned", label: "Rider Assigned", icon: <FaMotorcycle /> },
  { id: "in_transit", label: "In Transit", icon: <FaTruckMoving /> },
  { id: "delivered", label: "Delivered", icon: <FaCheckCircle /> },
];

const TrackParcel = () => {
  const { trackingId: paramId } = useParams();
  const [trackingId, setTrackingId] = useState(paramId || "");
  const [queryId, setQueryId] = useState(paramId || null);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["parcel", queryId],
    enabled: !!queryId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${queryId}`);
      return res.data;
    },
  });

  // Sort data by time
  const sortedData =
    data?.sort(
      (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
    ) || [];

  // Get current stage
  const currentStage =
    sortedData.length > 0
      ? sortedData[sortedData.length - 1].status
      : null;

  const getStageStatus = (id) => {
    if (!currentStage) return "pending";
    if (currentStage === "delivered") return "completed";
    const currentIndex = stages.findIndex((stage) => stage.id === currentStage);
    const stageIndex = stages.findIndex((stage) => stage.id === id);

    if (stageIndex < currentIndex) return "completed";
    if (stageIndex === currentIndex) return "active";
    return "pending";
  };

  useEffect(() => {
    if (paramId) setQueryId(paramId);
  }, [paramId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <motion.h2
        className="text-3xl font-bold text-green-800 mb-8 mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Parcel Tracking
      </motion.h2>

      {/* Search Bar */}
      <motion.div
        className="flex items-center gap-2 w-full max-w-md mb-10 bg-white/60 backdrop-blur-md p-3 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Enter Tracking ID..."
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        <button
          onClick={() => setQueryId(trackingId.trim())}
          disabled={!trackingId || isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </motion.div>

      {isError && (
        <motion.p
          className="text-red-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ❌ Parcel not found. Try again.
        </motion.p>
      )}

      {/* Tracker Section */}
      <motion.div
        className="max-w-4xl w-full p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {queryId ? (
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-8">
            Tracking ID:{" "}
            <span className="text-green-600">{queryId}</span>
          </h3>
        ) : (
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-8 opacity-70">
            Enter a tracking ID to see parcel progress
          </h3>
        )}

        {/* Progress Tracker */}
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 transform -translate-y-1/2 z-0"></div>

          {stages.map((stage, index) => {
            const status = getStageStatus(stage.id);
            const isLast = index === stages.length - 1;

            return (
              <motion.div
                key={stage.id}
                className="relative z-10 flex flex-col items-center text-center w-20 sm:w-24 md:w-28"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {!isLast && (
                  <div
                    className={`absolute top-1/2 left-1/2 w-full h-[4px] -z-10 transform -translate-y-1/2 ${
                      status === "completed" || status === "active"
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>
                )}

                <motion.div
                  className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 mb-2 transition-all duration-300 shadow-md ${
                    status === "completed"
                      ? "bg-green-500 text-white border-green-500"
                      : status === "active"
                      ? "border-green-500 text-green-600 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stage.icon}
                </motion.div>

                <p
                  className={`text-xs sm:text-sm font-medium ${
                    status === "active"
                      ? "text-green-600"
                      : status === "completed"
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {stage.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Parcel Info */}
        {sortedData.length > 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-700 text-base">
              Current Status:{" "}
              <span className="font-semibold text-green-600 capitalize">
                {currentStage.replace("_", " ")}
              </span>
            </p>

            {/* Timeline */}
            <div className="mt-8 space-y-3 text-left border-t pt-4">
              {sortedData.map((event, i) => (
                <motion.div
                  key={event._id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-sm transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-sm text-gray-800">
                    <span className="font-medium text-green-600 capitalize">
                      {event.status.replace("_", " ")}
                    </span>{" "}
                    - {event.details}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated by: {event.updateBy} |{" "}
                    {new Date(event.timeStamp).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TrackParcel;
