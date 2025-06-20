import React, { useState } from 'react';
import { createUser } from '../api/user';

function UserFrontend() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await createUser({ name, email });
    setResponse(user);
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>User Service</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Create User</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default UserFrontend;
