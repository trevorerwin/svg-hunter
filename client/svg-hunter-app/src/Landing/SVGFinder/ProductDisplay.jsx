import './ProductDisplay.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
  const navigate = useNavigate();

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceID: 'dummy' }), // Replace with the actual price ID
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // const sessionId = data.id;
        // console.log(sessionId);
        // Redirect the user to the checkout page using the session ID
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      props.setSubscribed(true);
      navigate('/success');
    }
    if (params.get('canceled')) {
      alert("Order canceled -- continue to shop around and checkout when you're ready.");
      window.location.href = '/canceled';
    }
  }, []);

  return (
    <>
      <div className='product'>
        <div className='product-description'>
          <h3>SVG Subscription</h3>
          <h5>$20.00 / year</h5>
        </div>
        <div className='product-text'>
          <p>In order to use SVG Finder, you must have an active subscription. Please click on the link below to subscribe through Stripe</p>
        </div>
        <form className='product-form' onSubmit={handleCheckout}>
          <button className='checkout-btn' type='submit'>
            Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductDisplay;
