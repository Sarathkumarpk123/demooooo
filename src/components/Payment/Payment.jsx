import React, { useState } from 'react';
import './Payment.css'; 

const Payment = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to process the payment details as needed
    setIsSuccess(true); // Show success message
  };

  const closePopup = () => {
    setIsSuccess(false); // Close the popup
    // Optionally redirect or reset form here
  };

  return (
    <div className='payment-container'>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Mobile Number'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Card Number'
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>

      {isSuccess && (
        <div className='popup'>
          <div className='popup-content'>
            <h3>Payment Successful!</h3>
            <p>Food is on the way.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
