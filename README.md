# Catálogo de Autos (PostgreSQL) y Charlas (MongoDB)

Este es un proyecto Full-Stack desarrollado con **Node.js, Express y EJS** que se conecta a una base de datos en un cluster de mongodb:
1. **MongoDB Atlas** (para el listado de charlas en un auditorio).

## 🚀 Requisitos Previos

Antes de ejecutar este proyecto en tu PC, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/es/) (Versión 18 o superior).
- Una cuenta y clúster activo en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias
Abre la terminal en la carpeta donde deseas guardar el proyecto y ejecuta:
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd Lab2_Web
npm install
```

### 2. Configurar las Variables de Entorno
1. Crea un archivo llamado `.env` en la raíz del proyecto.
2. Copia el contenido del archivo `.env.example` y pégalo en tu nuevo archivo `.env`.
3. Rellena los valores reales de tus credenciales (Tu contraseña de Postgres, y tu URI de MongoDB Atlas).

### 3. Iniciar el Servidor
Finalmente, levanta el proyecto ejecutando:
```bash
node index.js
```
Abre tu navegador y entra a **[http://localhost:3000](http://localhost:3000)** para interactuar con el sistema.

