"use client";
import React, { useState, useEffect } from 'react';
import { Task, useTasks } from '../context/TaskContext';
import { Pencil, X, LoaderCircle } from 'lucide-react';

const TaskEdit: React.FC<{ task: Task; onClose: () => void }> = ({ task, onClose }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description);
    const [status, setStatus] = useState<'pending' | 'completed'>(task.status);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { updateTask, loading } = useTasks();

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError('El título es obligatorio.');
            return;
        }

        const updatedTask = { ...task, title, description, status };

        try {
            if (task._id) {
                updateTask(task._id, updatedTask);
            } else {
                setError('Task ID is missing.');
            }
            setIsModalOpen(false);
            onClose();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Hubo un error al actualizar la tarea. Intenta nuevamente.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setError(null); // Limpiar error al cerrar el modal
        onClose();
    };

    return (
        <>
            <button className="rounded-md text-zinc-600 active:text-zinc-800 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300 duration-200" onClick={() => setIsModalOpen(true)}>
                <Pencil size={20} />
            </button>

            <div className={`fixed inset-0 p-4 bg-black/50 dark:bg-black/70 flex justify-center items-center z-50 duration-200 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-white p-4 sm:p-6 relative rounded-lg w-full max-w-md transform transition-all ease-in-out duration-300 border dark:border-zinc-700 dark:bg-zinc-800 dark:text-white ${isModalOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>
                    <button onClick={closeModal} className="absolute top-2 right-2">
                        <X />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4">Editar Tarea</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="block text-sm font-medium">Título:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título de la tarea"
                                className="w-full p-2 border text-base border-gray-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white outline-none duration-200 focus:border-zinc-600 dark:focus:border-white"
                            />
                        </div>

                        <div className="mt-4 flex flex-col gap-1">
                            <label htmlFor="description" className="block text-sm font-medium">Descripción (opcional):</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descripción de la tarea"
                                className="w-full p-2 border text-base border-gray-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white outline-none duration-200 focus:border-zinc-600 dark:focus:border-white"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="status" className="block text-sm font-medium">Estado:</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
                                className="w-full p-2 border text-base border-gray-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white outline-none duration-200 focus:border-zinc-600 dark:focus:border-white"
                            >
                                <option value="pending">Pendiente</option>
                                <option value="completed">Completada</option>
                            </select>
                        </div>

                        {error && (
                            <p className="mt-4 text-sm text-red-300">{error}</p>
                        )}

                        <div className="mt-6 flex justify-end space-x-2 text-base">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-500/90 dark:bg-gray-600 dark:hover:bg-gray-600/80 duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 font-medium bg-zinc-800 text-white rounded-md hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-white/80 duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <LoaderCircle className="animate-spin" size={20} /> : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskEdit;
