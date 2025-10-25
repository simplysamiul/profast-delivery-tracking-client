import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import {
    FaBarcode,
    FaBoxOpen,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaHandHoldingUsd,
    FaWallet
} from "react-icons/fa";
import { Hash, PackageX } from "lucide-react";
import Swal from 'sweetalert2';
import { MdDoneAll, MdOutlineDeliveryDining } from 'react-icons/md';

const CompletedDeliveries = () => {
    const axiousSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();


    // load completed delivery parcels data\
    const { data: parcels, isLoading } = useQuery({
        ueryKey: ["completedDeliveries", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiousSecure.get(`/rider/completedParcels?email=${user?.email}`);
            return res.data;
        },
    })




    const calculateEarning = (parcel) => {
        const cost = Number(parcel.deliveryCharge);
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return cost * 0.8;
        } else {
            return cost * 0.3;
        }
    };

    // use mutation for casout
    const { mutateAsync: cashout } = useMutation({
        mutationFn: async (parcelId) => {
            const res = await axiousSecure.patch(`/parcels/${parcelId}/cashout`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["completedDeliveries"])
        }

    });

    // update cashout status
    const handleCashout = (parcelId) => {
        Swal.fire({
            title: "Confirm Cashout",
            text: "You are about to cash out this delivery.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cash Out",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                cashout(parcelId)
                    .then(() => {
                        Swal.fire("Success", "Cashout completed.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to cash out. Try again.", "error");
                    });
            }
        });
    }

    return (
        <div className="max-w-8xl mx-auto p-4 md:p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#03373D] text-center border-b-2 pb-2 mt-10 md:-mt-3">
                Complited Deliveries
            </h2>

            {/* === No Parcel Found State === */}
            {isLoading || parcels.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-[#03373D]/10 p-6 rounded-full mb-4">
                        <PackageX size={60} className="text-[#03373D]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#03373D]">
                        No Completed Parcels Found
                    </h3>
                </div>
            ) : (
                /* === Assigned Parcels Table === */
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
                    <table className="table w-full min-w-[700px]">
                        <thead className="bg-[#03373D] text-lightG">
                            <tr>
                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2"><Hash size={14} />#</span>
                                </th>
                                <th><span className="flex items-center gap-2"><FaBarcode />Tracking ID</span></th>
                                <th><span className="flex items-center gap-2"><FaBoxOpen />Title</span></th>
                                <th><span className="flex items-center gap-2"><FaLocationArrow />From</span></th>
                                <th><span className="flex items-center gap-2"><FaMapMarkerAlt />To</span></th>
                                <th><span className="flex items-center gap-2"><FaBoxOpen />picked At</span></th>
                                <th><span className="flex items-center gap-2"><MdDoneAll />Delivery At</span></th>
                                <th><span className="flex items-center gap-2"><FaMoneyBillWave />Fee (৳)</span></th>
                                <th><span className="flex items-center gap-2"><FaHandHoldingUsd />Your Earning (৳)</span></th>
                                <th><span className="flex items-center gap-2"><FaWallet />Cashout</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-lightG transition-colors"
                                >
                                    <td>{index + 1}</td>
                                    <td className="font-medium max-w-[180px] truncate">{parcel.trackingId}</td>
                                    <td className="font-medium max-w-[180px] truncate">{parcel.parcelName}</td>
                                    <td className="font-medium max-w-[180px] truncate">{parcel.senderWarehouse}</td>
                                    <td>{parcel.receiverWarehouse}</td>
                                    <td className="font-medium max-w-[180px]">{parcel.pickedAt ? new Date(parcel.pickedAt).toLocaleString() : "N/A"}</td>
                                    <td className="font-medium max-w-[180px]">{parcel.deliveryAt ? new Date(parcel.deliveryAt).toLocaleString() : "N/A"}</td>
                                    <td><span className='font-semibold'>BDT -</span> {parcel.deliveryCharge} /-</td>
                                    <td><span className='font-semibold'>BDT -</span> {calculateEarning(parcel).toFixed(2)} /-</td>
                                    <td>
                                        {parcel.cashoutStatus === "cashOut" ? (
                                            <span className="px-3 py-1 rounded-full text-xs bg-deepG text-lightG font-semibold shadow-sm cursor-pointer tooltip" data-tip="Already Cashed Out">
                                                Cashed Out
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleCashout(parcel._id)}
                                                className="relative inline-flex items-center justify-center px-4 py-1.5 overflow-hidden text-sm font-semibold rounded-full cursor-pointer tooltip bg-warning" data-tip="Cashout"
                                            >
                                                <span className="absolute inset-0 rounded-full transition-all duration-300"></span>
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Cashout
                                                </span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompletedDeliveries;