import React, { useState, useEffect } from 'react';
import './Pay.scss';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js'
import CheckoutForm from '../../componets/CheckoutForm';

const stripePromise = loadStripe("pk_test_51MazwsSC7dTkAVAN3UGsqb66BT1gLxI8lFqJ45gBMuQ6Fx8QjxxJ5Xk3G77f0xBg14SNAaY8R8NrTaN1RdHOZuHk00oAonMefT");

const Pay = () => {

    const [clientSecret, setClientSecret] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error);
            }
        }
        makeRequest();
    }, []);

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };


    return (
        <div className="pay">
            {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
        </div>
    )
}

export default Pay