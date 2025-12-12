# Estructura de Base de Datos - Ángeles Condenados

## Archivos creados:

### 📦 **package.json**
- Define las dependencias del proyecto (Express, Mongoose, CORS, etc.)
- Contiene scripts para ejecutar el servidor

### 🖥️ **server.js**
- Archivo principal del servidor
- Configura Express y CORS
- Listo para activar conexión a BD y rutas

### 🔧 **config/database.js**
- Función para conectar a MongoDB
- Comentada, lista para activar

### 📋 **models/Usuario.js**
- Esquema de datos para usuarios
- Define campos: nombre, edad, teléfono, emergencia, moto, rol, etc.
- Generará la colección en MongoDB

### 🛣️ **routes/usuarios.js**
- CRUD completo comentado (GET, POST, PUT, DELETE)
- Operaciones con usuarios en la BD

### 🔐 **routes/login.js**
- Ruta de autenticación comentada
- Verifica usuario por teléfono

### ⚙️ **.env**
- Variables de entorno
- Configuración de puertos y conexión a BD

## Próximos pasos para conectar:

1. Instalar MongoDB en tu PC
2. Ejecutar `npm install` en la carpeta del proyecto
3. Descomentar las funciones en server.js
4. Actualizar las llamadas en tu JavaScript (desde localStorage a fetch() al servidor)

¿Quieres que continúe con la conexión?
