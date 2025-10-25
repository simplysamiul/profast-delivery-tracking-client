import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";
import Swal from "sweetalert2";
import { PackageX } from "lucide-react";
import useTrackingLogger from "../../../hooks/useTrackingLogger";
import useAuth from "../../../hooks/useAuth";

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [parcelDetails, setParcelDetails] = useState(null);
    const [riders, setRiders] = useState([]);
    const [isRiderLoading, setIsRiderLoading] = useState(false);
    const { logTracking } = useTrackingLogger();
    const {user} = useAuth();

    // Load all assignable parcels
    const {
        data: parcels = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["assignable-parcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?paymentStatus=paid&parcelStatus=pending"
            );
            return res.data;
        },
    });

    // Handle Assign button click — load riders dynamically
    const handleAssignClick = async (parcel) => {
        try {
            setSelectedParcel(parcel);
            setIsRiderLoading(true);

            const res = await axiosSecure.get(
                `/riders/available?riderDistrict=${parcel.receiverDistrict}&approval=verified`
            );
            setRiders(res.data);
        } catch (error) {
            console.error("Error fetching riders:", error);
        } finally {
            setIsRiderLoading(false);
        }
    };

    // Show parcel details modal
    const handleViewDetails = (parcel) => {
        setParcelDetails(parcel);
    };

    // Assign rider confirmation and API call
    const handleAssignRider = async (rider, parcelId) => {
        const confirm = await Swal.fire({
            title: `Assign ${rider.name}?`,
            text: `Are you sure you want to assign this rider to "${selectedParcel.parcelName}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, assign!",
            cancelButtonText: "Cancel",
            background: "#f9f9f9",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
                riderId: rider._id,
                riderName: rider.name,
                riderEmail: rider.email,
            });

            Swal.fire({
                title: "Assigned!",
                text: `${rider.name} has been assigned to ${selectedParcel.parcelName}.`,
                icon: "success",
                confirmButtonColor: "#198754",
                timer: 2500,
            });
            // send data for tracking
            await logTracking({
                trackingId: selectedParcel.trackingId,
                status: "rider_assigned",
                details: `Assigned to ${rider.email}`,
                updateBy: user.email

            })
            setSelectedParcel(null);
            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Failed!",
                text: "Something went wrong while assigning the rider.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen px-4 md:px-10 py-10">
            <h2 className="text-3xl font-bold mb-6 text-deepG text-center border-b-2 pb-2 mt-10 md:-mt-3">
                Assign Riders to Parcels
            </h2>

            {parcels.length === 0 ?
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-[#03373D]/10 p-6 rounded-full mb-4">
                        <PackageX size={60} className="text-[#03373D]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#03373D]">
                        No Completed Parcels Found
                    </h3>
                </div>
                /* Parcels Table */
                : <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="border-b bg-deepG text-lightG">
                                <th className="py-3 px-4">Tracking ID</th>
                                <th className="py-3 px-4">Parcel</th>
                                <th className="py-3 px-4">Type</th>
                                <th className="py-3 px-4">Payment</th>
                                <th className="py-3 px-4">Delivery Charge</th>
                                <th className="py-3 px-4">Receiver</th>
                                <th className="py-3 px-4">District</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr
                                    key={parcel._id}
                                    className="border-b transition hover:bg-lightG"
                                >
                                    <td className="py-3 px-4 font-semibold text-gray-700">
                                        {parcel.trackingId}
                                    </td>
                                    <td className="py-3 px-4">{parcel.parcelName}</td>
                                    <td className="py-3 px-4">{parcel.parcelType}</td>
                                    <td className="py-3 px-4">{parcel.paymentStatus}</td>
                                    <td className="py-3 px-4">
                                        <span className="text-deepG font-semibold">BDT </span>
                                        {parcel.deliveryCharge} /-
                                    </td>
                                    <td className="py-3 px-4">{parcel.receiverName}</td>
                                    <td className="py-3 px-4">{parcel.receiverDistrict}</td>
                                    <td className="py-3 px-4 text-center flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleViewDetails(parcel)}
                                            className="px-4 py-2 bg-amber-400 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleAssignClick(parcel)}
                                            className="px-4 py-2 bg-deepG text-lightG font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                                        >
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }


            {/* Rider Assign Modal */}
            <AnimatePresence>
                {selectedParcel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[500px] p-6 relative overflow-hidden"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-center text-deepG">
                                Verified Riders in{" "}
                                <span className="text-deepG">
                                    {selectedParcel.receiverDistrict}
                                </span>
                            </h2>

                            {isRiderLoading ? (
                                <div className="text-center py-10 text-gray-600 animate-pulse">
                                    Loading available riders...
                                </div>
                            ) : riders.length === 0 ? (
                                <p className="text-center text-gray-600 py-6">
                                    ❌ No verified rider available in this district.
                                </p>
                            ) : (
                                <ul className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
                                    {riders.map((rider) =>
                                        rider.workStatus === "assigned" ? null : (
                                            <li
                                                key={rider._id}
                                                className="flex justify-between items-center py-3 px-2 hover:bg-lightG transition rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {rider.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        📞 {rider.contact}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">
                                                        <span className="font-semibold">District:</span>{" "}
                                                        {rider.riderDistrict}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleAssignRider(rider, selectedParcel._id)
                                                    }
                                                    className="px-3 py-1.5 bg-deepG text-white rounded-lg text-sm hover:scale-105"
                                                >
                                                    Assign
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}

                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="absolute top-3 right-4 text-2xl"
                            >
                                ✖
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Parcel Details Modal */}
            <AnimatePresence>
                {parcelDetails && (
                    <dialog id="parcelModal" className="modal modal-open">
                        <div className="modal-box max-w-3xl bg-white text-[#03373D] overflow-y-auto max-h-[90vh]">
                            <h3 className="font-bold text-xl mb-4 text-[#03373D] border-b pb-2">
                                Parcel Details
                            </h3>

                            {/* General Info */}
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p><strong>Parcel Name:</strong> {parcelDetails.parcelName}</p>
                                    <p><strong>Parcel Type:</strong> {parcelDetails.parcelType}</p>
                                    <p><strong>Tracking ID:</strong> {parcelDetails.trackingId}</p>
                                    <p><strong>Booking Time:</strong> {parcelDetails.bookingTime}</p>
                                    <p><strong>Delivery Charge:</strong> ${parcelDetails.deliveryCharge}</p>
                                    <p><strong>Status:</strong> {parcelDetails.status}</p>
                                    <p><strong>Payment:</strong> <span
                                        className={`${parcelDetails.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"} badge text-white`}>
                                        {parcelDetails.paymentStatus}</span></p>
                                </div>
                                <div>
                                    <p><strong>Delivery Type:</strong> {parcelDetails.deliveryType}</p>
                                    <p><strong>User Email:</strong> {parcelDetails.userEmail}</p>
                                </div>
                            </div>

                            {/* Sender Info */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold border-b pb-1 mb-2 text-[#03373D]">
                                    Sender Information
                                </h4>
                                <div className="grid md:grid-cols-2 gap-3 text-sm">
                                    <p><strong>Sender Name:</strong> {parcelDetails.senderName}</p>
                                    <p><strong>District:</strong> {parcelDetails.senderDistrict}</p>
                                    <p><strong>Warehouse:</strong> {parcelDetails.senderWarehouse}</p>
                                    <p><strong>Address:</strong> {parcelDetails.senderAddress}</p>
                                    <p><strong>Contact:</strong> {parcelDetails.senderContact}</p>
                                    <p className="md:col-span-2">
                                        <strong>Pickup Instruction:</strong>{" "}
                                        {parcelDetails.pickupInstruction}
                                    </p>
                                </div>
                            </div>

                            {/* Receiver Info */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold border-b pb-1 mb-2 text-[#03373D]">Receiver Information</h4>
                                <div className="grid md:grid-cols-2 gap-3 text-sm">
                                    <p><strong>Receiver Name:</strong> {parcelDetails.receiverName}</p>
                                    <p><strong>District:</strong> {parcelDetails.receiverDistrict}</p>
                                    <p><strong>Warehouse:</strong> {parcelDetails.receiverWarehouse}</p>
                                    <p><strong>Address:</strong> {parcelDetails.receiverAddress}</p>
                                    <p><strong>Contact:</strong> {parcelDetails.receiverContact}</p>
                                    <p className="md:col-span-2">
                                        <strong>Delivery Instruction:</strong>{" "}
                                        {parcelDetails.deliveryInstruction}
                                    </p>
                                </div>
                            </div>

                            {/* Close Button */}
                            <div className="modal-action mt-6">
                                <button
                                    className="btn bg-[#03373D] text-lightG hover:bg-[#04545A]"
                                    onClick={() => setParcelDetails(null)}
                                >Close</button>
                            </div>
                        </div>
                    </dialog>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AssignRiders;
