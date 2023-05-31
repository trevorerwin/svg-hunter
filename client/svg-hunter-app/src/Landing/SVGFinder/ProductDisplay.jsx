import './ProductDisplay.css';

const ProductDisplay = (props) => {
  const handleCheckout = async () => {
    const response = await fetch('http://localhost:4000/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceID: 'price_1NAcY3BbFZD5Ir3VzW1Z0Z2T' }), // Replace with the actual price ID
    });

    if (response.ok) {
      const data = await response.json();
      const sessionId = data.id;
      // Redirect the user to the checkout page using the session ID
      window.location.href = `http://localhost:4000/checkout?session_id=${sessionId}`;
    } else {
      console.error('Failed to create checkout session');
    }
  };

  return (
    <>
      <div className='product'>
        <div className='product-description'>
          <h3>SVG Subscription</h3>
          <h5>$20.00 / year</h5>
        </div>
        <form className='product-form' action='/create-checkout-session' method='POST'>
          <input type='hidden' name='lookup-key' value='4' />
          <button className='checkout-btn' onClick={handleCheckout}>
            Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductDisplay;
