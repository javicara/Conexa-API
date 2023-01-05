# Conexa-API

El proyecto consisite en crear 2 microservicios. Para verlo en funcionamiento directamente pueden dirigirse a [Swagger](#documentacion)

## Micro Servicio de Log In:

Este microservicio tiene tres endpoints:

| Method | Endpoint      | Description                                                                                                              |
| ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| POST   | /users/signup | Registrar usuario con los campos "Mail" y "Password". No requiere JWT.                                                   |
| POST   | /users/signin | Autenticación de usuarios previamente creados en el Endpoint 1. <br> No requiere JWT, pero genera un JWT en el response. |
| GET    | /users        | Listar usuarios. Requiere JWT y llama al Endpoint 4 del Micro Servicio de Negocios.                                      |

## Microservicio 2 Business

| Method | Endpoint | Description                                                                                                                       |
| ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /users   | Listar usuarios. Requiere JWT. Permite visualizar todos los usuarios registrados con paginación y búsqueda no sensitiva por mail. |

## Tecnologias y herramientas utilizadas:

- _NodeJS_
- _Express.js_
- _MongoDB_ (Base de datos NoSQL)
- _Mocha y Chai._ (Testing)
- _JWT_ (Autenticacion)
- _Swagger_ (Documentacion)
- _AWS lightsail/ PM2 (Deploy)_

| Entities | Attributes                                                              |
| -------- | ----------------------------------------------------------------------- |
| **user** | - **email**: String<br>- **password**: String<br>- **name**: String<br> |

### Microservicio 1 LOGIN

| Method | Endpoint      | Description                                            |
| ------ | ------------- | ------------------------------------------------------ |
| POST   | /users/signup | Register new user                                      |
| POST   | /users/signin | Authentitcate a user (JWT)                             |
| GET    | /users        | Retrive the list of users using the other microservice |

### Microservicio 2 BUSINESS

| Method | Endpoint | Description               |
| ------ | -------- | ------------------------- |
| GET    | /users   | Retrive the list of users |

## Instalacion del proyecto

Para que el proyecto se ejecute correctamente, es necesario tener node, una URI para conectarse a una base de datos mongo y crear un archivo '.env' en cada carpeta del microservicio y establecer las variables de entorno correspondientes.
En el repositorio se han incluido ejemplos de estas variables.

### Instalacion de dependencias dentro de cada microservicio

`npm install`

`npm run start:login`

`npm run start:business`

## Testing solo para el microservicio de login

`npm run test`

## Documentacion

Para ver la documentacion de los endpoints, se puede acceder a la siguiente URL:

[Swagger](http://34.230.177.182:3000/api-docs)
