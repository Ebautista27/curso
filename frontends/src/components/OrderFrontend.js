import React, { useState } from 'react';
import { createOrder } from '../api/order';

function OrderFrontend() {
  const [userId, setUserId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = await createOrder({ user_id: userId, restaurant_id: restaurantId, items: [] });
    setResponse(order);
    setUserId('');
    setRestaurantId('');
  };

  return (
    <div>
      <h2>Order Service</h2>
      <form onSubmit={handleSubmit}>
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
        <input value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} placeholder="Restaurant ID" />
        <button type="submit">Create Order</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default OrderFrontend;
