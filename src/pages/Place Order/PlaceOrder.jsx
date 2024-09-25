import React from 'react';
import './PlaceOrder.css';
import { useNavigate, useLocation } from 'react-router-dom';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { cart, total } = location.state || {}; 

  const handleProceedToPayment = () => {
    if (cart && cart.length > 0) {
      navigate('/payment', { state: { cart, total } }); 
    } else {
      alert('No items in the cart!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Add logic to handle the submission of delivery information if needed
    alert('Delivery details submitted!');
  };

  return (
    <div>
      <form className='place-order' onSubmit={handleSubmit}>
        <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
        </div>
        
        <input type='text' placeholder='First Name' />
        <input type='text' placeholder='Last Name' />
        <input type='email' placeholder='Email' />
        <input type='text' placeholder='Street' />
        <input type='text' placeholder='City' />
        <input type='text' placeholder='State' />
        <input type='text' placeholder='Zip-Code' />
        <input type='text' placeholder='Country' />
        <input type='text' placeholder='Phone Number' />
        <button type="button" onClick={handleSubmit}>Submit Details</button> {/* Use type="button" */}
      </form>

      <div className='place-order-right'>
        <h2>Order Summary</h2>
        <div className='cart-summary'>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index}>
                <p>{item.name} x {item.quantity}</p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        {cart && cart.length > 0 && (
          <h3>Total: ₹{total}</h3>
        )}
        <button type="button" onClick={handleProceedToPayment}>
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
