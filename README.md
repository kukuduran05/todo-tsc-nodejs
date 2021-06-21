El proyecto consiste en lo siguiente:

Node.js Challenge:
Desarrollar una API Rest que permita el manejo de un TODO list para varios usuarios.
Requisitos:
- Debe ser capaz de conectarse a una base de datos para guardar y extraer información.
- Debe tener algún protocolo de autenticación para realizar operaciones.
- Operaciones: 
  * Obtener lista de un usuario
  * Crear una tarea
  * Actualizar una tarea
  * Eliminar una tarea
  * Ver una tarea
  * Crear usuario email/password y otros datos de interes a criterio.
  * Las tareas pueden tener categorias y pueden ser filtrados por ella.
  * Un usuario no puede modificar tareas que no le pertenecen.
- Utilizar metodos HTTP y codigos de estatus correctamente.
Tecnologias:
- Node.js con Express
- Typescript
- Base de datos a elegir
OPCIONAL: Al terminar todo el desarrollo del backend seria GENIAL poder ver toda la logica funcionando en una APP frontend usando React.


// Install dependencies
npm install

// Install modules for dev environmen
npm i typescript -D
npm i @types/express -D
npm i nodemon -D
npm i ts-node -D
npm i mysql2
npm i types/mysql2 -D
npm i dotenv