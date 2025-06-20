# Curso

Repositorio de ejemplo con una propuesta de arquitectura de microservicios para una tienda estilo Uber Eats.

Consulta la documentación en [docs/architecture.md](docs/architecture.md).

## Micro Frontends

En la carpeta `frontends` se encuentra un ejemplo básico en React que consume cada microservicio. Para ejecutarlo debes tener las dependencias instaladas y luego iniciar el servidor de desarrollo:

```bash
cd frontends
npm install
npm run start
```

Esto levantará la aplicación en `http://localhost:8080`, desde donde podrás probar la creación de usuarios, restaurantes, órdenes y pagos.
