import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import taskRoutes from "./routes/tasks";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tasks", taskRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Task Manager API is running" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Initialize database and start server
async function startServer() {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log("Database connection established");

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
            console.log(`API endpoints: http://localhost:${PORT}/tasks`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
    console.log("\nShutting down server...");
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        console.log("Database connection closed");
    }
    process.exit(0);
});

startServer(); 