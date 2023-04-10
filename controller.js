const express = require('express');
const process = require('process');
const { Client } = require('pg');
const app = express();

const client = new Client({
    host: process.env.host,
    port: process.env.port,
    dbname: process.env.database,
    user: process.env.user,
    password: process.env.password,
    sslmode: process.env.sslmode,
});

console.log('Connecting to Azure PostgreSQL database');

// client.connect()
//     .then(() => {
//         console.log('Connected to Azure PostgreSQL database');
//         // Perform database operations here
//     })
//     .catch(error => {
//         console.error('Failed to connect to Azure PostgreSQL database:', error);
//     });

console.log('Env variables: ')
console.log(client);



port = process.env.PORT || 3000;


app.get('/test/', (req, res) => {
    res.send('Jus testing');
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);




