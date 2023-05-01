
# ECOM-API

Una API sencilla para una tienda con un sistema de login de usuarios admin y mod. creado en **NodeJS** con **express**, **mongodb** y **jwt**.

## Configuración

- Clona la repo, entra dentro del proyecto y ejecuta el comando `npm install` o `pnpm install`

```bash
  git clone https://github.com/Arnollcvc/ecom-api.git
  cd ecom-api
  npm install ecom-api
```

Crea un archivo `.env`, copia el contenido de `.env-example` en el archivo creado

- Ejemplo

```env
PORT=3000
MONGO_URI="mongodb://localhost/test"
JWT_SECRET="test"
JWT_EXPIRE="30d"
ULTRA_MASTER_SECRET_KEY="admin"
```


## Uso y Ejemplos (products)

#### Get all products

```http
  GET /products
```

| Descripción                |
| :------------------------- |
| retorna un array con todos los productos |

#### Get product

```http
  GET /products/${id}
```

| Descripción                |
| :------------------------- |
| retorna un objeto con el producto |

#### Create product

```http
  POST /products
```

| Parametro | Tipo     | Permiso  | Descripción                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `x-access-token` | `string` | `admin` | x-access-token **Requerido** para esta acción |

- Body
```json
{
    "name": "Nike Air",
    "description": "Zapatos deportivos de alta calidad de la marca Nike",
    "price": 149.99,
    "category": "Calzado-deportivo",
    "stock": 63,
    "img": "https://example.com/img.png",
    "images": ["https://example.com/img_0.png", "https://example.com/img_1.png"]
}
```

#### Update product

```http
  PUT /products/${id}
```

| Parametro | Tipo     | Permiso  | Descripción                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `x-access-token` | `string` | `mod` | x-access-token **Requerido** para esta acción |

- Body (Update)
```json
{
    "name": "Nike Air",
    "description": "Zapatos deportivos de alta calidad de la marca Nike",
    "price": 999.99,
    "category": "Calzado-deportivo",
    "stock": 5,
    "img": "https://example.com/img.png",
    "images": ["https://example.com/img_0.png", "https://example.com/img_1.png"]
}
```

#### Delete product

```http
  DELETE /products/${id}
```

| Parametro | Tipo     | Permiso  | Descripción                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `x-access-token` | `string` | `mod` | x-access-token **Requerido** para esta acción |

***Nota***: *Reemplace `${id}` en los ejemplos de la API por el ID real del producto que desea buscar, actualizar o eliminar.*
## Uso y Ejemplos de registro de usuarios (auth)

#### crear una cuenta (singup)

```http
  POST /auth/singup
```

| Descripción                |
| :------------------------- |
| crea una cuenta de usuario sin permisos especiales |

- body
```json
{
  "username": "test",
  "email": "test@test.com",
  "password": "test"
}
```

Nota: esto retorna un objeto con un mensaje y el token de usuario.

#### Login

```http
  POST /auth/login
```

| Descripción                |
| :------------------------- |
| logeate y regenera el token de acceso con su respectivo permiso |

- body
```json
{
  "email": "test@test.com",
  "password": "test"
}
```
Nota: esto retorna un mensaje con el token. (no es posible editar los roles)

#### Logout

```http
  POST /auth/logout
```

| Parametro | Descripción                       |
| :------- | :-------------------------------- |
| `x-access-token` | x-access-token y correo electrónico **Requerido** para esta acción |

- Body
```json
{
  "email": "test@test.com"
}
```

#### Singup con permisos (admin/mod)

```http
  POST /auth/singup
```

| Parametro | Descripción                       |
| :------- | :-------------------------------- |
| `maste-key-secret-xxx-xxx-xxx` | se requiere una clave maestra de acceso para crear una cuenta con permisos |

- body
```json
{
  "username": "test",
  "email": "test@test.com",
  "password": "test",
  "roles": ["admin"]
}
```

Nota: esto retorna un objeto con un mensaje y el token de usuario. (no es posible editar los roles luego de haberlos creado)
## Features

- crud para productos
- seguridad anti dos/ddos
- validación de datos
- seguro y escalable


## Adicional

Esto es un proyecto de ejemplo que lo hice en una tarde, si encuentras algun bug o error... tarea para la casa, cualquier sugerencia de cambio o implementación es bienvenida.
para cualquier duda, pregunta o ayuda: discord: `ware#2498` - `809284928188448789`







*PD: intenté hacerlo lo más escalable posible, aún faltan cosas por hacer y terminar, desde este punto ya puedes seguir extendiéndolo dela manera que quieras ;D*