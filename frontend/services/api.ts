import { Task, CreateTaskData, UpdateTaskData } from '../types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Network error' }));
            throw new Error(error.error || `HTTP error! status: ${response.status}`);
        }

        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    // Get all tasks
    async getTasks(): Promise<Task[]> {
        return this.request<Task[]>('/tasks');
    }

    // Get a specific task
    async getTask(id: string): Promise<Task> {
        return this.request<Task>(`/tasks/${id}`);
    }

    // Create a new task
    async createTask(taskData: CreateTaskData): Promise<Task> {
        return this.request<Task>('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
    }

    // Update a task
    async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
        return this.request<Task>(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
        });
    }

    // Delete a task
    async deleteTask(id: string): Promise<void> {
        return this.request<void>(`/tasks/${id}`, {
            method: 'DELETE',
        });
    }
}

export const apiService = new ApiService(API_BASE_URL); 