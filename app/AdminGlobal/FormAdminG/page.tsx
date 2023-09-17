'use client'
import React from "react";
import AdminGlobalForm from "@/app/components/AdminGlobalForm";

export default function App() {

  return (
    <>
      {/* <div className="p-4 max-w-3xl mx-auto">
        <AdminGlobalForm/>
      </div> */}
      <div className="p-6 max-w-3xl mx-auto items-center justify-center h-screen">
        <div>
          <AdminGlobalForm/>
        </div>
      </div>
    </>
  );
}
