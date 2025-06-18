import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Task, TaskStatus } from "../entity/Task";

const router = Router();
const taskRepository = AppDataSource.getRepository(Task);

// GET /tasks - Get all tasks
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await taskRepository.find({
            order: {
                createdAt: "DESC"
            }
        });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /tasks/:id - Get a specific task
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await taskRepository.findOneBy({ id });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /tasks - Create a new task
router.post("/", async (req: Request, res: Response) => {
    try {
        const { title, description, status, dueDate } = req.body;

        // Validate required fields
        if (!title || !title.trim()) {
            return res.status(400).json({ error: "Title is required" });
        }

        if (status && !Object.values(TaskStatus).includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Create new task
        const task = taskRepository.create({
            title: title.trim(),
            description: description?.trim() || null,
            status: status || TaskStatus.TODO,
            dueDate: dueDate ? new Date(dueDate) : null
        });

        const savedTask = await taskRepository.save(task);
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /tasks/:id - Update a task
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;

        // Find the task
        const task = await taskRepository.findOneBy({ id });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Validate status if provided
        if (status && !Object.values(TaskStatus).includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Update task properties
        if (title !== undefined) {
            task.title = title.trim();
        }
        if (description !== undefined) {
            task.description = description?.trim() || null;
        }
        if (status !== undefined) {
            task.status = status;
        }
        if (dueDate !== undefined) {
            task.dueDate = dueDate ? new Date(dueDate) : null;
        }

        const updatedTask = await taskRepository.save(task);
        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await taskRepository.delete({ id });

        if (result.affected === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router; 