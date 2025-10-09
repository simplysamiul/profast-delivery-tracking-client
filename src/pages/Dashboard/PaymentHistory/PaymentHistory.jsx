import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../Shared/Loader/Loader';
import { AlertCircle, Receipt, Mail, Package, Wallet, CreditCard, Hash, CalendarClock, } from "lucide-react";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiousSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ["Payment", user.email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return <Loader />
    }

    const formatDate = (isoString) =>
        new Date(isoString).toLocaleString("en-BD", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    return (
        <div className="p-6">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-6 text-deepG text-center border-b-2 pb-2 mt-10 md:-mt-3">
                Payment History
            </h2>

            {payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-deepG/10 p-6 rounded-full mb-4">
                        <AlertCircle size={60} className="text-deepG" />
                    </div>
                    <h3 className="text-lg font-semibold text-deepG">
                        Not Found
                    </h3>
                    <p className="text-lg text-gray-500 font-medium">No Payment History Found</p>
                </div>

            ) : (
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-deepG text-lightG text-sm ">
                            <tr>
                                <th className="py-3 px-4 text-left">#</th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Mail size={16} className="text-lightG" />
                                        Email
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Package size={16} className="text-lightG" />
                                        Parcel ID
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Wallet size={16} className="text-lightG" />
                                        Amount (BDT)
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <CreditCard size={16} className="text-lightG" />
                                        Payment Method
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <Hash size={16} className="text-lightG" />
                                        Transaction ID
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-left">
                                    <span className="flex items-center gap-2">
                                        <CalendarClock size={16} className="text-lightG" />
                                        Paid At
                                    </span>
                                </th>

                                <th className="py-3 px-4 text-center">
                                    <span className="flex items-center justify-center gap-2">
                                        <Receipt size={16} className="text-lightG" />
                                        Action
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className="border-b hover:bg-lightG transition duration-200">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-semibold">{payment.email}</td>
                                    <td className="py-3 px-4">{payment.parcelId}</td>
                                    <td className="py-3 px-4 font-medium text-deepG">
                                        <span className='font-semibold'>BDT - </span>{payment.amount} /-
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">
                                        {payment.transactionId}
                                    </td>
                                    <td className="py-3 px-4">{formatDate(payment.paidAtString)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button className="inline-flex items-center gap-1 bg-deepG text-lightG border border-lightG hover:bg-lightG hover:border-deepG hover:text-deepG transition px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer">
                                            <Receipt size={16} />
                                            Invoice
                                        </button>
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

export default PaymentHistory;