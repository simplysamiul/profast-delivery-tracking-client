import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../Shared/Loader/Loader';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const { id: parcelId } = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const naviagte = useNavigate();


    // load specific parcel using parcel id
    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    });


    const price = parcelInfo.deliveryCharge;
    const amountInPaisa = price * 100;

    if (isPending) {
        return <Loader />
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const card = elements.getElement(CardElement);

        if (!stripe || !elements) {
            return;
        }
        if (!card) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            setError(error.message)
        } else {
            setError("")
        }


        // create payment recive process

        try {
            // Create PaymentIntent
            const res = await axiosSecure.post("/create-payment-intent", {
                amount: amountInPaisa,
                parcelId
            })

            const clientSecret = res.data.clientSecet;

            // Confirm the Payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {},
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {

                // send payment info to the databse
                setError("");
                const paymentData = { parcelId, email: user.email, amount: price, paymentMethod: paymentIntent.payment_method_types[0], transactionId: paymentIntent.id };

                const paymentRes = await axiosSecure.post("/payments", paymentData);
                if (paymentRes.data.insertedId) {
                    setLoading(false);
                    await Swal.fire({
                        icon: "success",
                        title: "Payment Completed!",
                        html: `
                        <p>Your payment has been received successfully.</p>
                        <p class="text-sm mt-1"><b>Transaction ID:</b> ${paymentIntent.id}</p>
                        `,
                        showCloseButton: true
                    });
                    naviagte("/dashboard/myParcels")

                }
            }
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: "error",
                title: "Payment Failed!",
                html: `
                        <p class="text-sm mt-1"><b>Transaction ID:</b> ${err.message}</p>
                        `,
                showCloseButton: true
            })
        }

    }



    return (
        <div className='h-[100%] md:h-[90%] lg:h-[80%] flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='space-y-6 bg-lightG p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-4 border rounded' />
                {loading ? <div className='flex items-center justify-center my-6'><span className="loading loading-ring loading-xl"></span></div>
                    : <button
                        type='submit'
                        disabled={!stripe}
                        className='btn btn-primary w-full'
                    >
                        Pay {price} BDT /-
                    </button>}
                {error && <p className='text-center text-red-500 font-semibold mt-6'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;