OVERVIEW:

Node.js Challenge:
Develop a REST API that follow the TODO list management for multiple users.

Requirements:
- Connect to Database for save and read information.
- Must to have some protocol for authentication.
- Actions: 
  * Get user list
  * Create tasks
  * Update tasks
  * Delete tasks
  * Get task
  * Create user with email/password and other information.
  * Tasks could to have categories and could to be filter by it.
  * A user can't modify tasks that do not belong to him.
- Must to have methods HTTP and status code correctly.
Technologies:
- Node.js with Express
- Typescript
- Database to choose

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