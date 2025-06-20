# Arquitectura de Microservicios para Tienda tipo Uber Eats

Este documento describe la base de datos principal y la estructura de microservicios para una API estilo Uber Eats. La comunicación entre servicios se realiza mediante eventos usando RabbitMQ.

## Base de Datos

Se utiliza **PostgreSQL** como base de datos principal. Cada microservicio puede tener su propia instancia o base de datos, pero comparten el siguiente esquema lógico:

### Tabla `users`
- `id` (UUID, PK)
- `name` (varchar)
- `email` (varchar, único)
- `password_hash` (varchar)

### Tabla `restaurants`
- `id` (UUID, PK)
- `name` (varchar)
- `address` (varchar)

### Tabla `menu_items`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `name` (varchar)
- `price` (numeric)

### Tabla `orders`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users.id)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `status` (varchar)
- `total` (numeric)

### Tabla `order_items`
- `order_id` (UUID, FK -> orders.id)
- `menu_item_id` (UUID, FK -> menu_items.id)
- `quantity` (integer)

## Microservicios

1. **User Service** (Node.js + Express)
   - Registro y autenticaci\u00f3n de usuarios.
   - Publica eventos `UserCreated` al registrarse un nuevo usuario.

2. **Restaurant Service** (Node.js + Express)
   - Administraci\u00f3n de restaurantes y de sus men\u00fas.
   - Escucha eventos de usuarios si es necesario (por ejemplo, para notificaciones).

3. **Order Service** (Python + Flask)
   - Crea y gestiona \u00f3rdenes.
   - Escucha eventos de `UserCreated` y publica eventos `OrderCreated`.

4. **Payment Service** (Go)
   - Procesa pagos de las \u00f3rdenes.
   - Escucha `OrderCreated` y emite `PaymentCompleted`.

## Comunicaci\u00f3n por Eventos

Todos los servicios se comunican mediante un broker de mensajes (RabbitMQ). Cada servicio publica y consume eventos relevantes:

- `UserCreated`
- `OrderCreated`
- `PaymentCompleted`

Los servicios deber\u00edan conectarse al exchange correspondiente y manejar las colas necesarias.

## Lenguajes Recomendados

- **Node.js** para servicios de usuario y restaurante debido a su ecosistema y rapidez para APIs REST.
- **Python** para el servicio de pedidos por su simplicidad y bibliotecas para l\u00f3gica de negocios.
- **Go** para pagos por su rendimiento y concurrencia.

