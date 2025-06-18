'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TaskStatus, CreateTaskData } from '../../types/task';
import { apiService } from '../../services/api';

export default function AddTaskPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<CreateTaskData>({
        title: '',
        description: '',
        status: TaskStatus.TODO,
        dueDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await apiService.createTask({
                ...formData,
                title: formData.title.trim(),
                description: formData.description?.trim() || undefined,
                dueDate: formData.dueDate || undefined,
            });

            router.push('/');
        } catch (err) {
            setError('Failed to create task');
            console.error('Error creating task:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                    ← Back to Tasks
                </Link>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">Add New Task</h1>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                                        <div className="mt-2 text-sm text-red-700">{error}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-black"
                                placeholder="Enter task title"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-black"
                                placeholder="Enter task description (optional)"
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-black"
                            >
                                <option value={TaskStatus.TODO}>To Do</option>
                                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                                <option value={TaskStatus.DONE}>Done</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-black"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : 'Create Task'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 