"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  FileText,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Note, PedidoUnificado } from "@/lib/interfaces/order";
import { formatDate, showWindowAlert } from "@/lib/utils/general";
import { addNote, changeNote, changeNotes } from "@/lib/utils/firebase";
import ConfirmDialog from "../general/ConfirmDialog";

export default function NoteGenerator({ order }: { order: PedidoUnificado }) {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<Note[]>(order.notas || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState("create");

  const changeTab = (value: "create" | "active") => {
    setTabValue(value);
  };

  // Crear nota
  const handleCreateNote = async () => {
    if (!text.trim()) return;
    const newNote: Note = {
      id: Math.random().toString(36).slice(2),
      text,
      createdAt: new Date(),
    };
    showWindowAlert({
      loader: true,
      title: "Creando nota",
      timeout: 0,
    });
    const success = await addNote(order.id, newNote);
    if (success) {
      setNotes((prev) => [...prev, newNote]);
      setText("");
    }
  };

  // Editar nota
  const handleEditNote = async () => {
    if (!editingId || !text.trim()) return;
    const noteToUpdate = notes.find((n) => n.id === editingId);
    if (!noteToUpdate) return;

    const updatedNote: Note = {
      ...noteToUpdate,
      text,
    };

    showWindowAlert({
      loader: true,
      title: "Actualizando nota",
      timeout: 0,
    });
    const success = await changeNote(order.id, updatedNote);
    if (success) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? updatedNote : n))
      );
      setEditingId(null);
      setText("");
    }
  };

  // Eliminar nota
  const handleDeleteNote = async (id: string) => {
    try {
      if (!id) return;
      showWindowAlert({
        title: "Eliminando nota",
        loader: true,
        timeout: 0,
      });
      const updatedNotes = notes.filter((n) => n.id !== id);
      const success = await changeNotes(order.id, updatedNotes);

      if (success) {
        setNotes(updatedNotes);
        if (editingId === id) {
          setEditingId(null);
          setText("");
        }
      }
    } catch (error) {
      showWindowAlert({
        title: "Error",
        message: "Error al eliminar la nota",
        icon: "error",
        timeout: 2000,
      });
    }
  };

  // Iniciar edición
  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setText(note.text);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setText("");
  };

  useEffect(() => {
    if (editingId) {
      setTabValue("create");
    }
  }, [editingId]);

  return (
    <div className="bg-gradient-to-br from-background to-muted/20 lg:p-6 overflow-y-auto">
      <div className="mx-auto">
        <Tabs value={tabValue} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-3 px-3 lg:px-6">
            <TabsTrigger
              value="create"
              onClick={() => {
                changeTab("create");
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Crear
            </TabsTrigger>
            <TabsTrigger
              value="active"
              onClick={() => {
                changeTab("active");
              }}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Activas ({notes.length})
            </TabsTrigger>
          </TabsList>

          {/* Tab: Crear Nota */}
          <TabsContent value="create">
            <div className="grid grid-cols-1 gap-6 !h-[70vh] overflow-auto">
              {/* Formulario de Creación/Edición */}
              <div className="lg:col-span-1 space-y-6 flex flex-col justify-start">
                <Card className="shadow-lg border bg-card">
                  <CardContent className="space-y-6">
                    {/* Campo de Texto */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="note-text"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Contenido de la nota
                      </Label>
                      <Textarea
                        id="note-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escribe el contenido de tu nota aquí..."
                        className="min-h-[150px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={500}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Máximo 500 caracteres</span>
                        <span>{text.length}/500</span>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        disabled={!text.trim()}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={editingId ? handleEditNote : handleCreateNote}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingId ? "Actualizar" : "Crear Nota"}
                      </Button>
                      {editingId && (
                        <Button
                          variant="outline"
                          className="px-4"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Notas Activas */}
          <TabsContent value="active">
            <Card className="shadow-lg border bg-card !h-[70vh] overflow-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Notas Activas
                  <Badge variant="secondary" className="ml-auto">
                    {notes.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Notas que están actualmente guardadas para este pedido
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No hay notas activas
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Crea tu primera nota en la pestaña "Crear"
                    </p>
                  </div>
                ) : (
                  <div className="pr-2 flex flex-col gap-1">
                    {notes.map((note, index) => (
                      <div key={note.id}>
                        <div
                          className={`
                          relative p-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md m-3
                          bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                          ${
                            editingId === note.id
                              ? "ring-2 ring-amber-400 ring-offset-2"
                              : ""
                          }
                        `}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-medium leading-relaxed break-words text-gray-800 dark:text-slate-200">
                                {note.text}
                              </p>
                              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
                                <span>
                                  Creada: {formatDate(note.createdAt)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-center h-full gap-2 flex-shrink-0 mt-3">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 border-0"
                                title="Editar nota"
                                onClick={() => startEdit(note)}
                              >
                                <Edit3 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                              </Button>

                              <ConfirmDialog
                                title="Eliminar nota"
                                description="¿Estás seguro de que deseas eliminar esta nota?"
                                confirmText="Eliminar"
                                cancelText="Cancelar"
                                onConfirm={() => handleDeleteNote(note.id)}
                              >
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 border-0"
                                  title="Eliminar nota"
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                                </Button>
                              </ConfirmDialog>
                            </div>
                          </div>

                          {editingId === note.id && (
                            <div className="absolute -top-2 -right-2">
                              <Badge className="bg-amber-500 text-white text-xs">
                                Editando
                              </Badge>
                            </div>
                          )}
                        </div>

                        {index < notes.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
