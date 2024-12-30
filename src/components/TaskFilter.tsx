"use client";
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskFilter: React.FC = () => {
  const { getTasks } = useTasks();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleFilterChange = (filter: 'all' | 'pending' | 'completed') => {
    if (filter !== activeFilter) {
      setActiveFilter(filter);
      getTasks(filter === 'all' ? undefined : filter);
    }
  };

  return (
    <div className="flex gap-2 justify-between sm:justify-center">
      <button
        onClick={() => handleFilterChange('all')}
        className={`px-3 w-full py-1.5 text-sm rounded-md border font-medium sm:w-fit ${activeFilter === 'all'
          ? 'bg-gray-500 text-white border-gray-500'
          : 'bg-gray-100 dark:bg-zinc-800 text-zinc-700 dark:text-white border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
      >
        Todos
      </button>
      <button
        onClick={() => handleFilterChange('pending')}
        className={`px-3 w-full py-1.5 text-sm rounded-md border font-medium sm:w-fit ${activeFilter === 'pending'
          ? 'bg-orange-500 text-white border-orange-500'
          : 'bg-gray-100 dark:bg-zinc-800 text-zinc-700 dark:text-white border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
      >
        Pendientes
      </button>
      <button
        onClick={() => handleFilterChange('completed')}
        className={`px-3 w-full py-1.5 text-sm rounded-md border font-medium sm:w-fit ${activeFilter === 'completed'
          ? 'bg-green-500 text-white border-green-500'
          : 'bg-gray-100 dark:bg-zinc-800 text-zinc-700 dark:text-white border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
      >
        Completadas
      </button>
    </div>
  );
};

export default TaskFilter;
