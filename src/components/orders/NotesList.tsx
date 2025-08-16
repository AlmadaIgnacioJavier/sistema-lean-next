"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageCircle } from "lucide-react";
import type { Note } from "@/lib/interfaces/order";

interface NotesListProps {
  notas?: Note[];
}

export default function NotesList({ notas }: NotesListProps) {
  if (!notas || notas.length === 0) return null;

  return (
    <div className="w-full md:col-span-full mt-4 space-y-2">
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {notas.map((nota) => (
          <div key={nota.id} className="relative group">
            <Alert className="bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-200 shadow-sm w-fit-content flex items-center gap-2">
              <MessageCircle className="h-5 w-5 flex justify-center items-center mb-1 h-full text-blue-800 dark:text-blue-200" />
              <AlertDescription className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {nota.text}
              </AlertDescription>
            </Alert>
          </div>
        ))}
      </div>
    </div>
  );
}
