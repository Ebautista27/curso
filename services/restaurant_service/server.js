const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

let channel;

async function connectRabbit() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  await channel.assertExchange('events', 'topic', { durable: false });
}

app.post('/restaurants', async (req, res) => {
  const restaurant = req.body; // {id, name, address}
  // Lógica de guardado en BD
  const event = { type: 'RestaurantCreated', data: restaurant };
  channel.publish('events', 'restaurant.created', Buffer.from(JSON.stringify(event)));
  res.status(201).json(restaurant);
});

connectRabbit().then(() => {
  app.listen(3002, () => console.log('Restaurant Service running on port 3002'));
});
