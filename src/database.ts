import mysql from 'mysql2';

// Create connection to DB
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
});


/*export async function connect () {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB
    });

    connection.connect(function(err){
        if (err) {
            console.log('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connection stablished!');
    });

    return connection;
}*/