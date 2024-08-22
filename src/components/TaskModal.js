'use client';

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const TaskModal = ({
  isOpen,
  onClose,
  isEdit = false,
  editTaskDescription = "",
  setEditTaskDescription,
  handleCreateTask,
  handleUpdateTask,
  newTaskDescription,
  setNewTaskDescription
}) => {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (isEdit) {
      if (editTaskDescription.trim() === "") {
        setError("La descripción de la tarea no puede estar vacía..");
        return;
      }
      handleUpdateTask();
    } else {
      if (newTaskDescription.trim() === "") {
        setError("La descripción de la tarea no puede estar vacía..");
        return;
      }
      handleCreateTask(newTaskDescription);
      setNewTaskDescription("");
    }
    onClose();
  };

  useEffect(() => {
    if (isEdit) {
      setEditTaskDescription(editTaskDescription);
    } else {
      setNewTaskDescription("");
    }
  }, [isEdit, editTaskDescription, setEditTaskDescription, setNewTaskDescription]);

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-4 rounded-md shadow-md w-full max-w-xl relative flex flex-col gap-3 items-end transition-transform duration-300 ease-in-out ${
          isOpen ? "transform scale-100" : "transform scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3">
          <X />
        </button>
        <h2 className="w-full text-start text-xl font-medium">
          {isEdit ? "Edita tu tarea" : "Crea una nueva tarea"}
        </h2>
        <input
          type="text"
          placeholder="Task description..."
          value={isEdit ? editTaskDescription : newTaskDescription}
          onChange={(e) =>
            isEdit
              ? setEditTaskDescription(e.target.value)
              : setNewTaskDescription(e.target.value)
          }
          className="border py-2 px-3 rounded-md w-full outline-none"
        />
        {error && <p className="text-red-400 w-full text-start">{error}</p>}
        <button
          onClick={handleSubmit}
          className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 hover:duration-200"
        >
          {isEdit ? "Actualizar tarea" : "Guardar tarea"}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
