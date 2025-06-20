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

app.post('/users', async (req, res) => {
  const user = req.body; // {id, name, email}
  // Aquí iría la lógica para guardar en BD
  const event = { type: 'UserCreated', data: user };
  channel.publish('events', 'user.created', Buffer.from(JSON.stringify(event)));
  res.status(201).json(user);
});

connectRabbit().then(() => {
  app.listen(3001, () => console.log('User Service running on port 3001'));
});
