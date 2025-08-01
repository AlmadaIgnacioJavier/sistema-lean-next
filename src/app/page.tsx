"use client";

import React from "react";
import Table from "@/components/orders/table";
import { Navbar } from "@/components/navbar";

export default function TestComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="space-y-6">
        <Table />
      </main>
    </div>
  );
}
