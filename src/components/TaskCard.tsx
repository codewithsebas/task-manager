import React, { useState } from 'react';
import { Task, useTasks } from '@/context/TaskContext';
import { Check, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import TaskEdit from './TaskEdit';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { updateTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const taskStatus = task.status === 'completed' ? 'completed' : 'pending';

  const handleStatusToggle = () => {
    const newStatus: 'pending' | 'completed' = taskStatus === 'pending' ? 'completed' : 'pending';
    if (task._id) {
      updateTask(task._id, { ...task, status: newStatus });
    }
  };

  const handleDelete = () => {
    if (task._id) {
      removeTask(task._id);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 border py-3 px-4 rounded-lg shadow duration-100 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white ${taskStatus === 'pending' ? "bg-white dark:bg-zinc-900" : "bg-gray-50 dark:bg-zinc-700"}`}
    >
      <div className="flex justify-between gap-3">
        <div className={`w-full h-full duration-500 ${taskStatus === 'completed' ? "line-through" : ""}`}>
          <h1 className="text-lg font-medium">{task.title}</h1>

          {/* Conditionally render either the <p> or <textarea> depending on edit mode */}
          {!isEditing ? (
            <p className="text-gray-300">{task.description}</p>
          ) : (
            <TaskEdit task={task} onClose={() => setIsEditing(false)} />
          )}
        </div>
        <div className="text-gray-500 dark:text-gray-300">{task.createdAt ? formatDate(task.createdAt) : 'No date available'}</div>
      </div>
      <div className="flex justify-between gap-3 w-full">
        <div className="flex items-center gap-2">
          <label
            htmlFor={task._id}
            className="flex flex-row items-center cursor-pointer gap-2.5 dark:text-white light:text-black"
          >
            <input
              type="checkbox"
              checked={taskStatus === 'completed'}
              onChange={handleStatusToggle}
              className="peer hidden"
              id={task._id}
            />
            <div
              className={`h-5 w-5 p-0.5 flex items-center rounded-md  
                ${taskStatus === 'pending' ? 'border border-orange-400 light:bg-green-400 dark:bg-zinc-900' : 'border border-green-400 bg-green-400'}
                peer-checked:bg-green-400 transition`}
            >
              {taskStatus === 'completed' && <Check className="text-white dark:text-black" size={20} />}
            </div>
            <div className={`text-sm font-semibold ${taskStatus === 'pending' ? 'text-orange-400' : 'text-green-400'}`}>
              {taskStatus === 'pending' ? 'Pendiente' : 'Completada'}
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3 text-2xl nocopy">
          {/* The TaskEdit component is rendered when `isEditing` is true */}
          <button onClick={() => setIsEditing(true)} className="text-blue-500">Edit</button>
          <button
            onClick={handleDelete}
            className="rounded-md text-zinc-600 active:text-zinc-800 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300 duration-200"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
