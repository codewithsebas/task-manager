"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axiosInstance from "@/utils/axiosConfig";
import axios from "axios";

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  removeTask: (id: string) => void;
  loading: boolean;
  error: string | null;
  getTasks: (status?: "pending" | "completed") => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message || "Error inesperado");
    } else {
      setError("Error desconocido");
    }
    console.error(error);
  };

  const getTasks = async (status?: "pending" | "completed") => {
    setLoading(true);
    setError(null);
    try {
      let url = "/tasks";
      if (status) url += `?status=${status}`;
      const response = await axiosInstance.get<Task[]>(url);
      setTasks(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Task) => {
    setLoading(true); // Estado para mostrar carga
    try {
      const response = await axiosInstance.post<Task>('/tasks', task);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Error con el servidor'
          : 'Error desconocido'
      );
    } finally {
      setLoading(false);
    }
  };


  const updateTask = async (id: string, updatedTask: Task) => {
    setError(null);
    try {
      await axiosInstance.put<Task>(`/tasks/${id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      handleError(error);
    }
  };

  const removeTask = async (id: string) => {
    setError(null);
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, removeTask, loading, error, getTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe utilizarse dentro de un TaskProvider");
  }
  return context;
};

export { TaskProvider, useTasks };
