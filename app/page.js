// pages/index.js
"use client";

import DynamicTable from "./Components/DynamicTable";
import Header from "./Components/Header";


export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-2 mt-[-20px]">
        <DynamicTable />
      </main>
    </div>
  );
}
