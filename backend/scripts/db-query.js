const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get database path
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Get query from command line arguments
const query = process.argv[2];

if (!query) {
    console.log('Usage: node db-query.js "SELECT * FROM task;"');
    process.exit(1);
}

// Open database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

// Execute query
db.all(query, [], (err, rows) => {
    if (err) {
        console.error('Error executing query:', err.message);
    } else {
        console.log('Query results:');
        console.table(rows);
    }
    
    // Close database
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
}); 