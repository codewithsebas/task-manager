import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("uid", "==", currentUser.uid)
    );
    const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribeTasks();
  }, [currentUser]);

  async function createTask(description) {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, "tasks"), {
        uid: currentUser.uid,
        description,
        completed: false,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error creando la tarea:", error);
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error("Error actualizando la tarea: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error eliminando la tarea: ", error);
    }
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
