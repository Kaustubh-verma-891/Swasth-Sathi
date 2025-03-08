import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RazorpayPayment = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch('http://localhost:3000/payment/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setOrderId(data.id);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    createOrder();
  }, []);

  const handlePayment = async () => {
    const isRazorpayLoaded = await loadRazorpayScript();

    if (!isRazorpayLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_m918erL3LHKfIT',
      order_id: orderId,
      name: 'HealthHub Payments',
      description: 'Consultation Payment',
      handler: function (response) {
        console.log(response);
        navigate('/patient-connect', { state: { paymentId: response.razorpay_payment_id } });
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Some address here',
      },
      theme: {
        color: '#4CAF50',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Razorpay Payment</h1>
        <p className="text-gray-600 mb-8">
          Securely pay for your doctor consultation or AI health service.
        </p>
        {orderId ? (
          <button
            onClick={handlePayment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Pay INR 30
          </button>
        ) : (
          <p className="text-blue-600 animate-pulse">Loading payment details...</p>
        )}
      </div>
    </div>
  );
};

export default RazorpayPayment;
