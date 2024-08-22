"use client";

import DashboardComponent from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Espera a que el estado de carga termine
    if (!loading) {
      if (!currentUser) {
        router.push("/");
      }
    }
  }, [currentUser, loading, router]);

  if (loading) {
    // Puedes mostrar un loader o mensaje mientras se determina el estado de autenticación
    return (
      <div>
        <span className="w-full h-screen flex flex-col gap-2 items-center justify-center">
          <div className="animate-spin">
          <LoaderCircle />
          </div>
          Cargando...
        </span>
      </div>
    );
  }

  return (
    <main className="w-full h-screen">
      <DashboardComponent currentUser={currentUser} />
    </main>
  );
};

export default Dashboard;
