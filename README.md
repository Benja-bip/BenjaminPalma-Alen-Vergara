# Frontend - Sistema Mantenedor de Usuarios

Proyecto: frontend React (Vite) para el proyecto "Sistema Mantenedor de Usuarios".

Requisitos locales
- Node.js y npm

Estructura esperada del repositorio
- frontend/
- backend/
- database/
- README.md (raíz)

Instalación y ejecución (desde `frontend/`)

```bash
npm install
npm run dev
```

Variables de entorno (ejemplo en `frontend/.env`)
- `VITE_SUPABASE_URL` — URL de tu proyecto Supabase
- `VITE_SUPABASE_ANON_KEY` — ANON key (frontend)
- `VITE_API_BASE_URL` — URL del backend (opcional, por defecto `http://localhost:8080/api`)

No subir a GitHub
- No subir `node_modules/` ni archivos compilados.

API esperada / Contrato
- `POST /auth/login` -> { token }
- `GET /users` -> [ users ]
- `POST /users` -> crea usuario
- `PUT /users/:id` -> actualiza
- `DELETE /users/:id` -> elimina

Supabase
- Si usas Supabase como base de datos, coloca `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en `frontend/.env`.
- La `ANON_KEY` se usa en el cliente; operaciones administrativas deben realizarse desde el backend con la `SERVICE_ROLE_KEY`.

Puertos por defecto
- Frontend Vite: `5173` (mostrar en consola al iniciar)
- Backend Spring Boot: `8080` (configurable)

Dependencias principales
- react, react-dom, vite, @vitejs/plugin-react, @supabase/supabase-js

Credenciales de prueba
- Añade aquí credenciales de prueba cuando estén disponibles (usuario/contraseña), por ejemplo:
  - admin@ejemplo.test / admin123

Git y entrega
- Crear una rama por dupla: `NombreAlumno1-NombreAlumno2`.
- Desarrollar en esa rama y realizar commits periódicos.
- No subir `node_modules` ni builds.
- Entregar todo publicado en GitHub con la rama final y `README.md` en la raíz.

README (requerido)
El README raíz deberá incluir:
- Explicación técnica breve de la solución.
- Instrucciones de instalación (frontend y backend).
- Dependencias usadas.
- Puertos utilizados.
- Ejecución frontend y backend.
- Configuración de la base de datos y ruta al script de creación de tablas.
- Credenciales de prueba.
- Integrantes de la dupla.

Entregables obligatorios
1. Proyecto Frontend: código fuente React funcional.
2. Proyecto Backend: código fuente Spring Boot funcional.
3. Script Base de Datos: creación tablas, llaves primarias y datos iniciales mínimos (colocar en `database/`).
4. README.md raíz con toda la información anterior.

