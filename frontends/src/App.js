import React, { useState } from 'react';
import UserFrontend from './components/UserFrontend';
import RestaurantFrontend from './components/RestaurantFrontend';
import OrderFrontend from './components/OrderFrontend';
import PaymentFrontend from './components/PaymentFrontend';

function App() {
  const [active, setActive] = useState('users');
  return (
    <div>
      <h1>Micro Frontends</h1>
      <nav>
        <button onClick={() => setActive('users')}>Users</button>
        <button onClick={() => setActive('restaurants')}>Restaurants</button>
        <button onClick={() => setActive('orders')}>Orders</button>
        <button onClick={() => setActive('payments')}>Payments</button>
      </nav>
      <div>
        {active === 'users' && <UserFrontend />}
        {active === 'restaurants' && <RestaurantFrontend />}
        {active === 'orders' && <OrderFrontend />}
        {active === 'payments' && <PaymentFrontend />}
      </div>
    </div>
  );
}

export default App;
