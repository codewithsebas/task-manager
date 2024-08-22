import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TasksProvider } from "@/context/TaskContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "Bienvenido a Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <TasksProvider>
          <body className={inter.className}>{children}</body>
        </TasksProvider>
      </AuthProvider>
    </html>
  );
}
