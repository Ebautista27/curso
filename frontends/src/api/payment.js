export async function createPayment(payment) {
  const response = await fetch('http://localhost:3004/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment)
  });
  return response.json();
}
