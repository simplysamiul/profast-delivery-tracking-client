import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Eye, Edit, Trash2, PackageX, CircleDollarSign, MapPinCheckInside, Hash, Package, Boxes, Scale, Clock, Wallet, CreditCard, Settings, } from "lucide-react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const MyParcels = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiousSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    // Color badge for payment status
    const getPaymentBadge = (status) => {
        switch (status) {
            case "paid":
                return <span className="badge bg-green-500 text-white">Paid</span>;
            case "pending":
                return <span className="badge bg-yellow-500 text-white">Pending</span>;
            case "unpaid":
            default:
                return <span className="badge bg-red-500 text-white">Unpaid</span>;
        }
    };

    // handel parcel delet function
    const handleParcelDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure ?",
            text: "This parcel will be permanently deleted !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#03373D"
        });
        if (confirm.isConfirmed) {
            try {
                axiousSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                text: "Parcel Deleted Successfully ....!",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            } catch (error) {
                Swal.fire({
                    text: `${error.message}`,
                    icon: "error"
                });
            }
        }
    };


    // handel payment process function
    const handlePayment = (id) => {
        navigate(`/dashboard/payment/${id}`)
    }
    return (
        <div className="max-w-8xl mx-auto p-4 md:p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#03373D] text-center border-b-2 pb-2 mt-10 md:-mt-3">
                My Parcels
            </h2>

            {/* === No Parcel Found State === */}
            {parcels.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-[#03373D]/10 p-6 rounded-full mb-4">
                        <PackageX size={60} className="text-[#03373D]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#03373D]">
                        No Parcels Found
                    </h3>
                    <p className="text-gray-500 text-lg mt-2">
                        You haven’t booked any parcels yet.
                    </p>
                </div>
            ) : (
                /* === Parcels Table === */
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
                    <table className="table w-full min-w-[700px]">
                        <thead className="bg-[#03373D] text-lightG">
                            <tr>
                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Hash size={16} className="text-lightG" />
                                        #
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
                                        <Clock size={16} className="text-lightG" />
                                        Booking Time
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
                                        <CreditCard size={16} className="text-lightG" />
                                        Payment
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
                                    <td className="font-medium max-w-[180px] truncate">{parcel.parcelName}</td>
                                    <td>{parcel.parcelType}</td>
                                    <td>{`${parcel.parcelWeight ? parcel.parcelWeight + "-(KG)" : "0"}`}</td>
                                    <td>{parcel.bookingTime}</td>
                                    <td><span className='font-semibold'>BDT -</span> {parcel.deliveryCharge} /-</td>
                                    <td>{getPaymentBadge(parcel.paymentStatus)}</td>
                                    <td className="flex justify-center gap-2 py-2 mt-4 xl:mt-0">
                                        {/* View */}
                                        <button
                                            className="btn btn-sm bg-[#03373de4] hover:bg-deepG text-white tooltip" data-tip="Details"
                                            onClick={() => setSelectedParcel(parcel)}
                                        >
                                            <Eye size={16} />
                                        </button>

                                        {/* Payment */}
                                        {parcel.paymentStatus === "unpaid" && <button
                                            className="btn btn-sm bg-blue-600 hover:bg-blue-800 text-white tooltip" data-tip="Payment"
                                            onClick={() => handlePayment(parcel._id)}
                                        >
                                            <CircleDollarSign size={16} />
                                        </button>}

                                        {/* Edit */}
                                        {parcel.paymentStatus === "unpaid" && (
                                            <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white tooltip" data-tip="Edit">
                                                <Edit size={16} />
                                            </button>
                                        )}

                                        {/* Delete */}
                                        {parcel.paymentStatus === "unpaid" && (
                                            <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white tooltip" data-tip="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        )}

                                        {/* Track parcdel */}
                                        {parcel.paymentStatus === "paid" && (
                                            <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white tooltip" data-tip="Track">
                                                <MapPinCheckInside size={16} />
                                            </button>
                                        )}

                                        {/* Invoice */}
                                        {parcel.paymentStatus === "paid" && (
                                            <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white tooltip" data-tip="Invoice">
                                                <FaFileInvoiceDollar size={16} />
                                            </button>
                                        )}
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

export default MyParcels;