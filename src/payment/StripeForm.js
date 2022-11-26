import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

const StripeForm = ({ order }) => {
    const { _id, email, name, price,product_name,matchby } = order;
    const [catchError, setCatchError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setClientSecret(data.clientSecret)
            });
    }, [order]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCatchError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }



        const { paymentIntent, error: confirmEroor } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name,
                        email
                    },
                },
            },
        );
        if(confirmEroor){
            setCatchError(confirmEroor.message);
            return;
        }
        if(paymentIntent.status === 'succeeded'){
            const paymentInfo = {id: _id,matchby,name,email,product_name,price, tnxId: paymentIntent.id};
            setCatchError('');
            fetch(`http://localhost:5000/payment`,{
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(paymentInfo)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.acknowledged){
                    toast.success('Payment successfully done');
                }
            })
        }
    };




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#000',
                                '::placeholder': {
                                    color: '#000',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success w-full block mt-5 te ' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <h3 className='text-lg font-semibold text-red-600 px-2'>{catchError}</h3>
        </div>
    )
}

export default StripeForm