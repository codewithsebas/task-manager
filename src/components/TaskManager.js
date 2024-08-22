"use client";

import React, { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskModal from "./TaskModal";
import { Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";

const TaskManager = ({ currentUser }) => {
  const { tasks, updateTask, deleteTask, createTask } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDescription, setEditTaskDescription] = useState("");

  const handleEditTask = (taskId, description) => {
    setEditTaskId(taskId);
    setEditTaskDescription(description);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = () => {
    if (editTaskDescription.trim() === "") {
      return;
    }
    updateTask(editTaskId, { description: editTaskDescription });
    setEditTaskId(null);
    setEditTaskDescription("");
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex justify-between gap-2">
        <h2 className="font-semibold text-2xl">
          Welcome, {currentUser?.email}
        </h2>
        <button
          onClick={() => {
            setIsCreateModalOpen(true);
            setIsEditModalOpen(false); // Ensure edit modal is closed when opening create modal
          }}
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 mb-4"
        >
          Crea una tarea
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between mb-2 border rounded-md p-4 ${
              task.completed ? "border-green-500 bg-green-100" : " border"
            }`}
          >
            <span className={task.completed ? "line-through" : ""}>
              {task.description}
            </span>
            <div className="flex items-center gap-3">
              <button
                className="text-black/50 rounded-md hover:text-black/70 duration-200"
                onClick={() =>
                  updateTask(task.id, { completed: !task.completed })
                }
              >
                {task.completed ? <CircleCheckBig /> : <Circle />}
              </button>
              <button
                onClick={() => handleEditTask(task.id, task.description)}
                className="text-black/50 rounded-md hover:text-black/70 duration-200"
              >
                <Pencil />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-black/50 rounded-md hover:text-black/70 duration-200"
              >
                <Trash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        isEdit={false}
        handleCreateTask={createTask}
        newTaskDescription={editTaskDescription}
        setNewTaskDescription={setEditTaskDescription}
      />
      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setEditTaskId(null);
          setEditTaskDescription("");
          setIsEditModalOpen(false);
        }}
        isEdit={true}
        editTaskDescription={editTaskDescription}
        setEditTaskDescription={setEditTaskDescription}
        handleUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default TaskManager;
