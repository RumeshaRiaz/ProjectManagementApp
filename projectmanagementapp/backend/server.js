const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// CORS configuration
app.use(cors({ origin: 'http://10.64.240.44:8081', credentials: true }));

app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ProjectManagement',
    password: 'admin123',
    port: 5432,
});

// Session management
app.use(session({
    secret: 'your_session_secret', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if using HTTPS
}));



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
