import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const card = elements.getElement(CardElement);

        if (!stripe || !elements) {
            return;
        }
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            setError(error.message)
        } else {
            setError("")
            console.log("Payment Method", paymentMethod)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-6 bg-lightG p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-4 border rounded' />
                    <button 
                    type='submit' 
                    disabled={!stripe}
                    className='btn btn-primary w-full'
                    >
                        Pay For Parcel Pickup
                    </button>
                    {error && <p className='text-center text-red-500 font-semibold mt-6'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;