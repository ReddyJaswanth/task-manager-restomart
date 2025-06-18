const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get database path
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Open database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

// Create task table
const createTaskTable = `
CREATE TABLE IF NOT EXISTS task (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'todo',
    dueDate DATETIME,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
)`;

db.run(createTaskTable, (err) => {
    if (err) {
        console.error('Error creating task table:', err.message);
    } else {
        console.log('Task table created successfully!');
        
        // Show table schema
        db.all("PRAGMA table_info(task);", [], (err, rows) => {
            if (err) {
                console.error('Error getting table info:', err.message);
            } else {
                console.log('\nTable schema:');
                console.table(rows);
            }
            
            // Close database
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('\nDatabase connection closed.');
                }
            });
        });
    }
}); 