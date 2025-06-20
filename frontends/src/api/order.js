export async function createOrder(order) {
  const response = await fetch('http://localhost:3003/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return response.json();
}
