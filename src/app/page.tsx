"use client"
import AddTask from "@/components/TaskForm";
import TaskFilter from "@/components/TaskFilter";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/context/TaskContext";

export default function Home() {
  const { tasks } = useTasks();

  return (
    <main className="w-full h-screen flex flex-col gap-5 justify-start items-center px-4">
      <nav className="w-full max-w-2xl mt-10">
        <h1 className="font-semibold text-3xl">
          App Task Manager
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
          Tienes {tasks.length} tareas para los próximos días.
        </p>
      </nav>
      <div className="w-full flex flex-col gap-3 justify-between max-w-2xl  border-b border-gray-300 dark:border-gray-700 pb-4 sm:flex-row">
        <TaskFilter />
        <AddTask />
      </div>
      <TaskList />
    </main>
  );
}
