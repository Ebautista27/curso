export async function createRestaurant(restaurant) {
  const response = await fetch('http://localhost:3002/restaurants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restaurant)
  });
  return response.json();
}
