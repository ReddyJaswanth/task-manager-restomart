export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
}

export interface UpdateTaskData {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
} 