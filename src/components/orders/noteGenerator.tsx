"use client";

import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const colorOptions = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-400",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
];

interface Note {
  text: string;
  color: string;
}

export default function NoteGenerator() {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!text || !selectedColor) {
      alert("Por favor completá el contenido y seleccioná un color.");
      return;
    }

    const newNote = { text, color: selectedColor };

    if (editingIndex !== null) {
      const updated = [...notes];
      updated[editingIndex] = newNote;
      setNotes(updated);
      setEditingIndex(null);
    } else {
      setNotes((prev) => [...prev, newNote]);
    }

    setText("");
    setSelectedColor("");
  };

  const handleEdit = (index: number) => {
    const note = notes[index];
    setText(note.text);
    setSelectedColor(note.color);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setText("");
      setSelectedColor("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 max-h-[80vh] overflow-y-auto">
      {notes.length > 0 && (
        <Accordion
          type="single"
          collapsible
          className="bg-gray-100 rounded-md shadow"
        >
          <AccordionItem value="notas">
            <AccordionTrigger className="px-4 py-2 font-semibold text-sm">
              Alertas actuales
            </AccordionTrigger>
            <AccordionContent className="space-y-3 px-4 pb-4 pt-1">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl shadow-sm ${note.color}`}
                >
                  <span className="text-white font-semibold text-sm truncate max-w-[60%]">
                    {note.text}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      title="Editar"
                      className="bg-white p-1 rounded hover:bg-gray-100 transition"
                    >
                      <Pencil className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      title="Eliminar"
                      className="bg-white p-1 rounded hover:bg-gray-100 transition"
                    >
                      <Trash className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contenido de la alerta
        </label>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribí tu alerta..."
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor === color
                  ? "ring-2 ring-offset-1 ring-black shadow-lg"
                  : "border-transparent"
              } ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleGenerate}>
          {editingIndex !== null ? "Actualizar" : "Generar"}
        </Button>
      </div>
    </div>
  );
}
