import React, { useState } from 'react';
import { createRestaurant } from '../api/restaurant';

function RestaurantFrontend() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurant = await createRestaurant({ name, address });
    setResponse(restaurant);
    setName('');
    setAddress('');
  };

  return (
    <div>
      <h2>Restaurant Service</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <button type="submit">Create Restaurant</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default RestaurantFrontend;
