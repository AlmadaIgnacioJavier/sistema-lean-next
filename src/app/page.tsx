"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Table from "@/components/orders/table";
import { Navbar } from "@/components/navbar";

export default function TestComponent() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="space-y-6">
          <Table />
        </main>
      </div>
    </QueryClientProvider>
  );
}
