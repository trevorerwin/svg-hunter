const ProductDisplay = (props) => {
  return (
    <>
      <div className='product'>
        <img src='client\svg-hunter-app\src\img\svghunter_logo.png' alt='SVG Hunter logo' />
        <div className='product-description'>
          <h3>SVG Hunter</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action='/create-checkout-session' method='POST'>
        <button type='submit'>Checkout</button>
      </form>
    </>
  );
};

export default ProductDisplay;
