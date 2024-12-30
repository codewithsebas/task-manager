# Task Manager App

Task Manager App es una aplicación diseñada para gestionar tareas. Esta App permite crear, leer, actualizar y eliminar tareas, además de ofrecer una bonita interfaz de usuario con modo oscuro dependiendo de tu sistema.

## Requisitos Previos

- **Node.js** v18 o superior

## Instalación

**Clona el repositorio**:
```bash
   git clone https://github.com/codewithsebas/task-manager
   cd task-manager
```

**Instala las dependencias**:

```bash
   npm install
```

**Configura las variables de entorno**:

Crea un archivo .env en el directorio raíz con el siguiente contenido:

```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Reemplaza NEXT_PUBLIC_API_URL con tu cadena de conexión del Backend.

**Ejecuta el servidor**:


```bash
    npm run dev
```

## Recursos utilizados

Node.js: Plataforma principal para la ejecución del backend.

Next.js: Framework de React para el frontend.

#### Con esta guía, deberías poder instalar y ejecutar la aplicación Task Manager App en tu entorno local. ¡Disfruta de la App!