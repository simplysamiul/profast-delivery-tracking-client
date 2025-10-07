import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
// import { useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh")

const Payment = () => {
    // const {id} = useParams();
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;