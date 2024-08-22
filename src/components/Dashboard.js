import Image from "next/image";
import React, { useEffect, useState } from "react";
import LogoutButton from "./Auth/Logout";
import TaskManager from "./TaskManager";

const DashboardComponent = ({ currentUser }) => {
  return (
    <>
      <div className="flex justify-between gap-2 p-4 flex-col item md:flex-row ">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h2 className="font-semibold text-2xl">Task Manager</h2>
        </div>
        <LogoutButton />
      </div>

    
        <TaskManager currentUser={currentUser} />
    </>
  );
};

export default DashboardComponent;
