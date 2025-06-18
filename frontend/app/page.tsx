'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Task, TaskStatus } from '../types/task';
import { apiService } from '../services/api';

export default function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const fetchedTasks = await apiService.getTasks();
            setTasks(fetchedTasks);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await apiService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task');
            console.error('Error deleting task:', err);
        }
    };

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.TODO:
                return 'bg-yellow-100 text-yellow-800';
            case TaskStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800';
            case TaskStatus.DONE:
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.TODO:
                return 'To Do';
            case TaskStatus.IN_PROGRESS:
                return 'In Progress';
            case TaskStatus.DONE:
                return 'Done';
            default:
                return status;
        }
    };

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(task => task.status === filter);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        Manage your tasks efficiently
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        href="/add"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add Task
                    </Link>
                </div>
            </div>

            {/* Filter */}
            <div className="mt-6">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all'
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter(TaskStatus.TODO)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${filter === TaskStatus.TODO
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        To Do
                    </button>
                    <button
                        onClick={() => setFilter(TaskStatus.IN_PROGRESS)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${filter === TaskStatus.IN_PROGRESS
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        In Progress
                    </button>
                    <button
                        onClick={() => setFilter(TaskStatus.DONE)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${filter === TaskStatus.DONE
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Done
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            {filteredTasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500">
                                        {filter === 'all' ? 'No tasks found' : `No ${getStatusLabel(filter as TaskStatus).toLowerCase()} tasks`}
                                    </div>
                                    {filter !== 'all' && (
                                        <Link
                                            href="/add"
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                                        >
                                            Create your first task
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Task
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Due Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTasks.map((task) => (
                                            <tr key={task.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {task.title}
                                                            </div>
                                                            {task.description && (
                                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                                    {task.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                                        {getStatusLabel(task.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(task.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={`/edit/${task.id}`}
                                                            className="text-primary-600 hover:text-primary-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(task.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 