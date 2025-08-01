"use client";

import React from "react";
import { Menu, Home, User, Settings, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeSwitch } from "@/components/theme-switch";

const menuItems = [
  {
    icon: Home,
    label: "Inicio",
    href: "/",
  },
  {
    icon: User,
    label: "Perfil",
    href: "/profile",
  },
  {
    icon: Settings,
    label: "Ajustes",
    href: "/settings",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMenuItemClick = (href: string) => {
    // Aquí puedes agregar la lógica de navegación
    console.log(`Navegando a: ${href}`);
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de cerrar sesión
    console.log("Cerrando sesión...");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        {/* Lado izquierdo - Menú hamburguesa */}
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 sm:w-96 p-0"
              hideCloseButton={true}
            >
              <div className="flex flex-col h-full">
                {/* Header del drawer */}
                <SheetHeader className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <SheetTitle className="text-xl font-semibold text-left">
                        Menú Principal
                      </SheetTitle>
                      <SheetDescription className="text-left mt-1">
                        Navega por las diferentes secciones
                      </SheetDescription>
                    </div>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-accent"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cerrar menú</span>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>

                {/* Contenido del drawer */}
                <div className="flex-1 px-6 py-4">
                  <div className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className="w-full justify-start h-12 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 rounded-lg"
                          onClick={() => handleMenuItemClick(item.href)}
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer del drawer */}
                <div className="px-6 py-4 border-t mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 text-base font-medium text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-200 rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centro - Logo o título (opcional) */}
        <div className="hidden sm:flex items-center">
          <h1 className="text-lg font-semibold text-foreground">
            Sistema Lean
          </h1>
        </div>

        {/* Lado derecho - Avatar y Theme Switch */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block">
            <ThemeSwitch />
          </div>

          <Avatar className="h-9 w-9 ring-2 ring-border hover:ring-primary/20 transition-all duration-200 cursor-pointer">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Avatar del usuario"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              JD
            </AvatarFallback>
          </Avatar>

          {/* Theme switch para móvil */}
          <div className="sm:hidden">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
