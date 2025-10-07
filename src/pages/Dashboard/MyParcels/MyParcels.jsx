import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Eye, Edit, Trash2, PackageX } from "lucide-react";

const MyParcels = () => {
    const { user } = useAuth();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiousSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    // Color badge for payment status
    const getPaymentBadge = (status) => {
        switch (status) {
            case "Paid":
                return <span className="badge bg-green-500 text-white">Paid</span>;
            case "Pending":
                return <span className="badge bg-yellow-500 text-white">Pending</span>;
            case "Unpaid":
            default:
                return <span className="badge bg-red-500 text-white">Unpaid</span>;
        }
    };
    console.log(parcels);
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
          <p className="text-gray-600 mt-2">
            You haven’t booked any parcels yet.
          </p>
        </div>
      ) : (
        /* === Parcels Table === */
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
          <table className="table w-full min-w-[700px]">
            <thead className="bg-[#03373D] text-[#CAEB66]">
              <tr>
                <th>#</th>
                <th>Parcel Name</th>
                <th>Type</th>
                <th>Booking Time</th>
                <th>Delivery Charge</th>
                <th>Payment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-[#CAEB66] transition-colors"
                >
                  <td>{index + 1}</td>
                  <td className="font-medium">{parcel.parcelName}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.bookingTime}</td>
                  <td>Bdt - {parcel.deliveryCharge} /-</td>
                  <td>{getPaymentBadge(parcel.paymentStatus)}</td>
                  <td className="flex justify-center gap-2 py-2">
                    {/* View */}
                    <button
                      className="btn btn-sm bg-[#03373de4] hover:bg-deepG text-white"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      <Eye size={16} />
                    </button>

                    {/* Edit */}
                    {parcel.paymentStatus === "Unpaid" && (
                      <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Edit size={16} />
                      </button>
                    )}

                    {/* Delete */}
                    {parcel.paymentStatus === "Unpaid" && (
                      <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white">
                        <Trash2 size={16} />
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
                <p>
                  <strong>Parcel Name:</strong> {selectedParcel.parcelName}
                </p>
                <p>
                  <strong>Parcel Type:</strong> {selectedParcel.parcelType}
                </p>
                <p>
                  <strong>Tracking ID:</strong> {selectedParcel.trackingId}
                </p>
                <p>
                  <strong>Booking Time:</strong> {selectedParcel.bookingTime}
                </p>
                <p>
                  <strong>Delivery Charge:</strong> ${selectedParcel.deliveryCharge}
                </p>
                <p>
                  <strong>Status:</strong> {selectedParcel.status}
                </p>
                <p>
                  <strong>Payment:</strong> {selectedParcel.paymentStatus}
                </p>
              </div>
              <div>
                <p>
                  <strong>Delivery Type:</strong> {selectedParcel.deliveryType}
                </p>
                <p>
                  <strong>User Email:</strong> {selectedParcel.userEmail}
                </p>
              </div>
            </div>

            {/* Sender Info */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold border-b pb-1 mb-2 text-[#03373D]">
                Sender Information
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <p>
                  <strong>Sender Name:</strong> {selectedParcel.senderName}
                </p>
                <p>
                  <strong>District:</strong> {selectedParcel.senderDistrict}
                </p>
                <p>
                  <strong>Warehouse:</strong> {selectedParcel.senderWarehouse}
                </p>
                <p>
                  <strong>Address:</strong> {selectedParcel.senderAddress}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedParcel.senderContact}
                </p>
                <p className="md:col-span-2">
                  <strong>Pickup Instruction:</strong>{" "}
                  {selectedParcel.pickupInstruction}
                </p>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold border-b pb-1 mb-2 text-[#03373D]">
                Receiver Information
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <p>
                  <strong>Receiver Name:</strong> {selectedParcel.receiverName}
                </p>
                <p>
                  <strong>District:</strong> {selectedParcel.receiverDistrict}
                </p>
                <p>
                  <strong>Warehouse:</strong> {selectedParcel.receiverWarehouse}
                </p>
                <p>
                  <strong>Address:</strong> {selectedParcel.receiverAddress}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedParcel.receiverContact}
                </p>
                <p className="md:col-span-2">
                  <strong>Delivery Instruction:</strong>{" "}
                  {selectedParcel.deliveryInstruction}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="modal-action mt-6">
              <button
                className="btn bg-[#03373D] text-[#CAEB66] hover:bg-[#04545A]"
                onClick={() => setSelectedParcel(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
    );
};

export default MyParcels;