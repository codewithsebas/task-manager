import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "@/context/TaskContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "App Task Manager",
  description: "Esta App permite crear, leer, actualizar y eliminar tareas, además de ofrecer una bonita interfaz de usuario con modo oscuro dependiendo de tu sistema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
