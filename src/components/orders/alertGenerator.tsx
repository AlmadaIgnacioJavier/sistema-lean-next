"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Palette,
  FileText,
  Bell,
  EyeOff,
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
import { COLORS } from "@/lib/constants/colors";
import { Alert, PedidoUnificado } from "@/lib/interfaces/order";
import { formatDate, showWindowAlert } from "@/lib/utils/general";
import { Colors } from "@/lib/enum/colors";
import { addAlert, changeAlert } from "@/lib/utils/firebase";
import ConfirmDialog from "../general/ConfirmDialog";

export default function AlertGenerator({
  order,
}: {
  order: PedidoUnificado;
  refetchVentas?: () => void;
}) {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState<Colors | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>(order.alertas || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState("create");

  const changeTab = (value: "create" | "active") => {
    setTabValue(value);
  };

  // Importar funciones de firebase

  // Crear alerta
  const handleCreateAlert = async () => {
    if (!text.trim() || !selectedColor) return;
    const newAlert: Alert = {
      id: Math.random().toString(36).slice(2),
      text,
      color: selectedColor,
      createdAt: new Date(),
    };
    showWindowAlert({
      loader: true,
      title: "Creando alerta",
      timeout: 0,
    });
    const success = await addAlert(order.id, newAlert);
    if (success) {
      setAlerts((prev) => [...prev, newAlert]);
      setText("");
      setSelectedColor(null);
    }
  };

  // Editar alerta
  const handleEditAlert = async () => {
    if (!editingId || !text.trim() || !selectedColor) return;
    const updatedAlerts = alerts.map((a) =>
      a.id === editingId ? { ...a, text, color: selectedColor } : a
    );
    showWindowAlert({
      loader: true,
      title: "Actualizando alerta",
      timeout: 0,
    });
    const success = await changeAlert(order.id, updatedAlerts);
    if (success) {
      setAlerts(updatedAlerts);
      setEditingId(null);
      setText("");
      setSelectedColor(null);
    }
  };

  // Eliminar alerta
  const handleDeleteAlert = async (id: string) => {
    try {
      if (!id) return;
      showWindowAlert({
        title: "Eliminando alerta",
        loader: true,
        timeout: 0,
      });
      const updatedAlerts = alerts.filter((a) => a.id !== id);
      const success = await changeAlert(order.id, updatedAlerts);

      if (success) {
        setAlerts(updatedAlerts);
        if (editingId === id) {
          setEditingId(null);
          setText("");
          setSelectedColor(null);
        }
      }
    } catch (error) {
      showWindowAlert({
        title: "Error",
        message: "Error al eliminar la alerta",
        icon: "error",
        timeout: 2000,
      });
    }
  };

  // Iniciar edición
  const startEdit = (alert: Alert) => {
    setEditingId(alert.id);
    setText(alert.text);
    setSelectedColor(alert.color);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setText("");
    setSelectedColor(null);
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
              <Bell className="h-4 w-4" />
              Activas ({alerts.length})
            </TabsTrigger>
          </TabsList>

          {/* Tab: Crear Alerta */}
          <TabsContent value="create">
            <div className="grid grid-cols-1 gap-6 !h-[70vh] overflow-auto">
              {/* Columna Izquierda - Controles */}
              <div className="lg:col-span-1 space-y-6 flex flex-col justify-center">
                {/* Formulario de Creación/Edición */}
                <Card className="shadow-lg border bg-card">
                  <CardContent className="space-y-6">
                    {/* Campo de Texto */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="note-text"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Contenido de la alerta
                      </Label>
                      <Textarea
                        id="note-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escribe el contenido de tu alerta aquí..."
                        className="min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={200}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Máximo 200 caracteres</span>
                        <span>{text.length}/200</span>
                      </div>
                    </div>

                    {/* Selector de Color */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Color de la alerta
                      </Label>
                      <div className="grid grid-cols-5 gap-3">
                        {Object.values(COLORS).map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setSelectedColor(option.name)}
                            className={`
                              relative w-12 h-12 rounded-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400
                              ${option.value}
                              ${
                                selectedColor === option.name
                                  ? "ring-2 ring-offset-2 ring-foreground scale-110"
                                  : "hover:ring-2 hover:ring-offset-1 hover:ring-muted-foreground"
                              }
                            `}
                            title={option.name}
                          >
                            {selectedColor === option.name && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      {selectedColor && (
                        <Badge variant="secondary" className="w-fit">
                          Color seleccionado:{" "}
                          {COLORS[selectedColor as Colors].name}
                        </Badge>
                      )}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        disabled={!text.trim() || !selectedColor}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={
                          editingId ? handleEditAlert : handleCreateAlert
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingId ? "Actualizar" : "Crear Alerta"}
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

          {/* Tab: Alertas Activas */}
          <TabsContent value="active">
            <Card className="shadow-lg border bg-card !h-[70vh] overflow-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  Alertas Activas
                  <Badge variant="secondary" className="ml-auto">
                    {alerts.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Alertas que están actualmente visibles y activas
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No hay alertas activas
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Crea tu primera alerta en la pestaña "Crear"
                    </p>
                  </div>
                ) : (
                  <div className="pr-2 flex flex-col gap-1">
                    {alerts.map((note, index) => (
                      <div key={note.id}>
                        <div
                          className={`
                          relative p-3 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md m-3
                          ${note.color} ${COLORS[note.color].value}
                          ${
                            editingId === note.id
                              ? "ring-2 ring-amber-400 ring-offset-2"
                              : ""
                          }
                        `}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-medium leading-relaxed break-words">
                                {note.text}
                              </p>
                              <div className="mt-3 flex items-center gap-4 text-xs opacity-90">
                                <span>
                                  Creada: {formatDate(note.createdAt)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-center h-full gap-2 flex-shrink-0 mt-3">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 border-0"
                                title="Editar alerta"
                                onClick={() => startEdit(note)}
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </Button>

                              <ConfirmDialog
                                title="Eliminar alerta"
                                description="¿Estás seguro de que deseas eliminar esta alerta?"
                                confirmText="Eliminar"
                                cancelText="Cancelar"
                                onConfirm={() => handleDeleteAlert(note.id)}
                              >
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 border-0"
                                  title="Eliminar alerta"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
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

                        {index < alerts.length - 1 && (
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
