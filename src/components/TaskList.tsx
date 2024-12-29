"use client";
import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import Loading from './Loading';

const TaskList: React.FC = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) return <Loading />;

  return (
    <div className="w-full h-full max-w-2xl flex flex-col gap-3 pb-4 sm:mb-4 rounded-lg sm:overflow-y-auto sm:pb-1 sm:pr-2">
      {error ? (
        <p className="w-full h-full flex items-center justify-center text-lg text-red-300 font-medium">
          {error}
        </p>
      ) : tasks?.length === 0 ? (
        <p className="w-full h-full flex items-center justify-center text-lg text-black/50 dark:text-gray-300 font-medium">
          Crea tus tareas del día!
        </p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
