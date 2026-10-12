# Proyecto Monlej


Catálogo web y panel de administración para **Confecciones Monlej**, una microempresa textil artesanal de Curacautín, Chile.

Proyecto de la carrera Ingeniería Civil en Informática, Universidad Católica de Temuco.
**Autoras:** Catalina Fonseca Imihuala y Pamela Vielma Díaz · **Docente:** Pedro Andres Gaete Villegas

---

## Problema

Monlej confecciona uniformes escolares, vestidos de folclor y accesorios, y atiende todo (consultas, catálogo, tallas, telas, personalización) manualmente por WhatsApp. Esto obliga a la dueña, Cecilia Vielma, a reenviar fotografías una y otra vez y a responder cada consulta de stock, lo que le quita tiempo de producción.

## Solución

Un sitio web con catálogo por categorías, stock y tallas visibles, galería de telas y diseños de folclore, mapa de ubicación del taller y un panel de administración para que la dueña actualice todo sin conocimientos técnicos.

## MVP (noviembre)

**Incluye**
- Catálogo público por categorías (Uniformes, Ropa, Accesorios, Infantil, Folclore, Otros) con precio, tallas y stock.
- Galería de telas y diseños para pedidos de folclore.
- Mapa interactivo del taller (Leaflet) y enlaces a redes sociales y WhatsApp.
- Formulario de contacto.
- Panel de administración con login: CRUD de productos, stock y tallas, imágenes y telas.

**No incluye (versión futura)**
- Carrito de compras, pago en línea y facturación.
- Registro de pedidos y clientes, y dashboard con KPIs de ventas.
- Aplicación móvil nativa y contabilidad.

El detalle de historias de usuario, criterios de aceptación y backlog está en el informe del proyecto.

## Arquitectura

```
Navegador ──► Frontend (React + Vite + Tailwind)  ──►  API REST (Node.js + Express)  ──►  PostgreSQL
                      │                                         │
                      ├─► Leaflet / OpenStreetMap               └──────────────────────►  Cloudinary (imágenes)
                      └─► Enlaces a WhatsApp y redes
```

| Capa | Tecnología | Hosting |
|---|---|---|
| Frontend | React, Vite, Tailwind CSS, Leaflet | Vercel |
| API | Node.js, Express, JWT, bcrypt | Render (plan gratuito) |
| Base de datos | PostgreSQL | Neon (plan gratuito) |
| Imágenes | Cloudinary | Cloudinary |


## Estructura del repositorio

```
monlej-proyecto/
├── frontend/        # Aplicación React (Vite)
├── backend/         # API REST (Express)
└── README.md
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior
- npm
- Una base de datos PostgreSQL (local o en Neon)
- Una cuenta de Cloudinary (para subir imágenes)

## Instalación y ejecución local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Catalinafonsec4/monlej-proyecto.git
   cd monlej-proyecto
   ```

2. Configurar las variables de entorno (ver sección siguiente).

3. Levantar el backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. En otra terminal, levantar el frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   El sitio queda disponible en `http://localhost:5173`.

## Variables de entorno

Cree un archivo `.env` en cada carpeta. **No suba estos archivos a GitHub** (ya deben estar en `.gitignore`).

**`backend/.env`**

```env
PORT=3000
DATABASE_URL=postgresql://usuario:clave@host:5432/monlej
JWT_SECRET=una_clave_larga_y_aleatoria
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CORS_ORIGIN=http://localhost:5173
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:3000
```

## Comandos útiles

| Comando | Dónde | Qué hace |
|---|---|---|
| `npm run dev` | `frontend/` o `backend/` | Ejecuta en modo desarrollo |
| `npm run build` | `frontend/` | Genera la versión de producción |
| `npm test` | `frontend/` o `backend/` | Ejecuta las pruebas |

## Pruebas y CI

- **Frontend:** Vitest y React Testing Library.
- **Backend:** Vitest y Supertest.
- **Pipeline:** GitHub Actions ejecuta instalación, build y pruebas en cada push y en cada Pull Request hacia `main`.

## Flujo de trabajo en Git

- `main`: rama por defecto, estable y lista para despliegue.
- `feature/catalina`: trabajo de API, base de datos y pipeline.
- `pamela`: trabajo de frontend, componentes y mapa.
- Los cambios se integran a `main` mediante Pull Request revisado por la otra integrante.
- Las tareas se organizan como Issues en GitHub Projects, con una Issue por historia de usuario.

## Estado del proyecto

| Componente | Estado |
|---|---|
| Estructura base React (Vite) y Tailwind con paleta personalizada | Hecho |
| Navbar y Footer | Hecho |
| Mapa Leaflet con popup de ubicación | Hecho |
| Servidor Express inicial | Hecho |
| Base de datos PostgreSQL y tablas iniciales | En desarrollo |
| Endpoint de productos y catálogo consumiendo la API | Pendiente |
| Pipeline CI | Pendiente |
| Login de administradora y CRUD de productos | Release 0.2 |
| Subida de imágenes, galería de telas y formulario de contacto | Release 0.2 |

### Releases

| Versión | Contenido |
|---|---|
| 0.1 | Base del proyecto, Navbar, Footer, mapa, servidor Express, endpoint de productos y catálogo, pipeline CI |
| 0.2 (MVP) | Login, CRUD de productos, stock y tallas, imágenes, galería de telas, formulario de contacto |
| 1.0 (futura) | Registro de pedidos y clientes, dashboard con KPIs |

## Identidad visual

| Uso | Color |
|---|---|
| Rosa vino (texto) | `#4A1E28` |
| Rosa acento (hover, bordes, botones) | `#D65A8C` |
| Rosa pastel (fondos de Navbar y Footer) | `#FDF2F4` |
| Rosa ultra claro (fondos de sección) | `#FCF8F9` |

Tipografías: Cormorant Garamond o Playfair Display (títulos y menú), Montserrat (textos) y Great Vibes (logotipo).

## Licencia

Proyecto académico. Todos los derechos del logotipo e imágenes pertenecen a Confecciones Monlej.
