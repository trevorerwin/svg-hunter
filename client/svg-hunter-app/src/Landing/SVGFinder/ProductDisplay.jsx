import './ProductDisplay.css';

const ProductDisplay = (props) => {
  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceID: 'price_dummy' }), // Replace with the actual price ID
      });

      if (response.ok) {
        const data = await response.json();
        const sessionId = data.id;
        // Redirect the user to the checkout page using the session ID
        window.location.href = `https://localhost:4000/checkout?session_id=${sessionId}`;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  return (
    <>
      <div className='product'>
        <div className='product-description'>
          <h3>SVG Subscription</h3>
          <h5>$20.00 / year</h5>
        </div>
        <form className='product-form' action='/checkout/create-checkout-session' method='POST' onSubmit={handleCheckout}>
          <button className='checkout-btn'>Checkout</button>
        </form>
      </div>
    </>
  );
};

export default ProductDisplay;
