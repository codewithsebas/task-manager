"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirige a la página de login o a la página principal
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 h-fit px-3 bg-purple-700 rounded-md text-white hover:bg-purple-600 duration-200"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
