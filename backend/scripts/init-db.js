require('reflect-metadata');
const { AppDataSource } = require('../src/config/database');

async function initializeDatabase() {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log('✅ Database connection established');

        // Synchronize database (create tables)
        await AppDataSource.synchronize();
        console.log('✅ Database synchronized successfully');

        // Show all tables
        const tables = await AppDataSource.query("SELECT name FROM sqlite_master WHERE type='table'");
        console.log('\n📋 Tables in database:');
        console.table(tables);

        // Show task table schema
        const taskSchema = await AppDataSource.query("PRAGMA table_info(task)");
        console.log('\n📋 Task table schema:');
        console.table(taskSchema);

        // Close connection
        await AppDataSource.destroy();
        console.log('\n✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase(); 