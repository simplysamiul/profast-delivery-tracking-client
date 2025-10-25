import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaLocationArrow, FaPhoneAlt, FaTruckMoving, FaUser } from 'react-icons/fa';
import { Eye, PackageX, Hash, Package, Boxes, Scale, Wallet, Settings, } from "lucide-react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import useTrackingLogger from '../../../hooks/useTrackingLogger';

const PendingDeliveries = () => {
    const axiousSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { user } = useAuth();
    const { logTracking } = useTrackingLogger();
    const queryClient = useQueryClient();

    // load parcels assigned data
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["riderParcels"],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiousSecure.get(`/rider/parcels?email=${user.email}`)
            return res.data;
        }
    });


    // mutation for updating parcel status
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ parcel, status }) => {
            const res = await axiousSecure.patch(`/parcel/${parcel._id}/status`, {
                status,
                riderEmail: user.email
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["riderParcels"])
        }
    })

    // update parcel status
    const handleStatusUpdate = (parcel, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus({ parcel, status: newStatus })
                    .then(async () => {
                        Swal.fire("Updated!", `Parcel status ${newStatus}`, "success");

                        // log tracking
                        let trackDetails = `Picked up by ${user.displayName}`
                        if (newStatus === 'delivered') {
                            trackDetails = `Delivered by ${user.displayName}`
                        }
                        await logTracking({
                            trackingId: parcel.trackingId,
                            status: newStatus,
                            details: trackDetails,
                            updateBy: user.email
                        });

                    })
                    .catch((err) => {
                        console.log(err)
                        Swal.fire("Error!", "Failed to update status.", "error");
                    });
            }
        });
    };

    return (
        <div className="max-w-8xl mx-auto p-4 md:p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#03373D] text-center border-b-2 pb-2 mt-10 md:-mt-3">
                Pending Parcel
            </h2>

            {/* === No Parcel Found State === */}
            {isLoading || parcels.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-[#03373D]/10 p-6 rounded-full mb-4">
                        <PackageX size={60} className="text-[#03373D]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#03373D]">
                        No Parcels Assigned
                    </h3>
                </div>
            ) : (
                /* === Assigned Parcels Table === */
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
                    <table className="table w-full min-w-[700px]">
                        <thead className="bg-[#03373D] text-lightG">
                            <tr>
                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Hash size={14} className="text-lightG" />
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <FaPhoneAlt size={16} className="text-lightG" />
                                        Reciver Name
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <FaUser size={16} className="text-lightG" />
                                        Phone
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Package size={16} className="text-lightG" />
                                        Parcel Name
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Boxes size={16} className="text-lightG" />
                                        Type
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Scale size={16} className="text-lightG" />
                                        Weight
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Wallet size={16} className="text-lightG" />
                                        Delivery Charge
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <FaLocationArrow size={16} className="text-lightG" />
                                        Delivery Location
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-center">
                                    <span className="flex items-center justify-center gap-2">
                                        <Settings size={16} className="text-lightG" />
                                        Actions
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-lightG transition-colors"
                                >
                                    <td>{index + 1}</td>
                                    <td className="font-medium max-w-[180px] truncate">{parcel.receiverName}</td>
                                    <td className="font-medium max-w-[180px] truncate">{parcel.receiverContact}</td>
                                    <td className="font-medium max-w-[180px] truncate">{parcel.parcelName}</td>
                                    <td>{parcel.parcelType}</td>
                                    <td>{`${parcel.parcelWeight ? parcel.parcelWeight + "-(KG)" : "0"}`}</td>
                                    <td><span className='font-semibold'>BDT -</span> {parcel.deliveryCharge} /-</td>
                                    <td>{parcel.receiverWarehouse}</td>
                                    <td className="flex justify-center gap-2 py-2 mt-4 xl:mt-0">
                                        {/* View */}
                                        <button
                                            className="btn btn-sm bg-[#03373de4] hover:bg-deepG text-white tooltip" data-tip="Details"
                                            onClick={() => setSelectedParcel(parcel)}
                                        >
                                            <Eye size={16} />
                                        </button>

                                        {/* Picup parcel */}
                                        {parcel?.status === "assigned" && <button
                                            className="btn btn-sm bg-red-500 hover:bg-red-700 text-white tooltip" data-tip="Mark Pickup"
                                            onClick={() => handleStatusUpdate(parcel, "in_transit")}
                                        >
                                            <FaTruckMoving size={16} />
                                        </button>}

                                        {/* Delivered parcel */}
                                        {parcel?.status === "in_transit" && <button
                                            className="btn btn-sm bg-green-400 hover:bg-green-700 text-white tooltip" data-tip="Delivered"
                                            onClick={() => handleStatusUpdate(parcel, "delivered")}
                                        >
                                            <RiCheckboxCircleFill size={16} />
                                        </button>}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* === Parcel Details Modal === */}
            {selectedParcel && (
                <dialog id="parcelModal" className="modal modal-open">
                    <div className="modal-box max-w-3xl bg-white text-[#03373D] overflow-y-auto max-h-[90vh]">
                        <h3 className="font-bold text-xl mb-4 text-[#03373D] border-b pb-2">
                            Parcel Details
                        </h3>

                        {/* General Info */}
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p><strong>Parcel Name:</strong> {selectedParcel.parcelName}</p>
                                <p><strong>Parcel Type:</strong> {selectedParcel.parcelType}</p>
                                <p><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
                                <p><strong>Booking Time:</strong> {selectedParcel.bookingTime}</p>
                                <p><strong>Delivery Charge:</strong> ${selectedParcel.deliveryCharge}</p>
                                <p><strong>Status:</strong> {selectedParcel.status}</p>
                                <p><strong>Payment:</strong> <span
                                    className={`${selectedParcel.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"} badge text-white`}>
                                    {selectedParcel.paymentStatus}</span></p>
                            </div>
                            <div>
                                <p><strong>Delivery Type:</strong> {selectedParcel.deliveryType}</p>
                                <p><strong>User Email:</strong> {selectedParcel.userEmail}</p>
                            </div>
                        </div>

                        {/* Sender Info */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold border-b pb-1 mb-2 text-[#03373D]">
                                Sender Information
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                <p><strong>Sender Name:</strong> {selectedParcel.senderName}</p>
                                <p><strong>District:</strong> {selectedParcel.senderDistrict}</p>
                                <p><strong>Warehouse:</strong> {selectedParcel.senderWarehouse}</p>
                                <p><strong>Address:</strong> {selectedParcel.senderAddress}</p>
                                <p><strong>Contact:</strong> {selectedParcel.senderContact}</p>
                                <p className="md:col-span-2">
                                    <strong>Pickup Instruction:</strong>{" "}
                                    {selectedParcel.pickupInstruction}
                                </p>
                            </div>
                        </div>

                        {/* Receiver Info */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold border-b pb-1 mb-2 text-[#03373D]">Receiver Information</h4>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                <p><strong>Receiver Name:</strong> {selectedParcel.receiverName}</p>
                                <p><strong>District:</strong> {selectedParcel.receiverDistrict}</p>
                                <p><strong>Warehouse:</strong> {selectedParcel.receiverWarehouse}</p>
                                <p><strong>Address:</strong> {selectedParcel.receiverAddress}</p>
                                <p><strong>Contact:</strong> {selectedParcel.receiverContact}</p>
                                <p className="md:col-span-2">
                                    <strong>Delivery Instruction:</strong>{" "}
                                    {selectedParcel.deliveryInstruction}
                                </p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="modal-action mt-6">
                            <button
                                className="btn bg-[#03373D] text-lightG hover:bg-[#04545A]"
                                onClick={() => setSelectedParcel(null)}
                            >Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingDeliveries;