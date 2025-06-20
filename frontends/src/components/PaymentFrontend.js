import React, { useState } from 'react';
import { createPayment } from '../api/payment';

function PaymentFrontend() {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payment = await createPayment({ order_id: orderId, amount });
    setResponse(payment);
    setOrderId('');
    setAmount('');
  };

  return (
    <div>
      <h2>Payment Service</h2>
      <form onSubmit={handleSubmit}>
        <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Order ID" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
        <button type="submit">Create Payment</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default PaymentFrontend;
