from flask import Flask, request, jsonify
import pika
import json

app = Flask(__name__)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.exchange_declare(exchange='events', exchange_type='topic', durable=False)

@app.route('/orders', methods=['POST'])
def create_order():
    order = request.json  # {'id', 'user_id', 'restaurant_id', 'items': []}
    # Lógica de guardado en BD
    event = {'type': 'OrderCreated', 'data': order}
    channel.basic_publish(exchange='events', routing_key='order.created', body=json.dumps(event))
    return jsonify(order), 201

if __name__ == '__main__':
    app.run(port=3003)
