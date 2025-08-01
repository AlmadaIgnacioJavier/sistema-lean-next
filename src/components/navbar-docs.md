# Componente Navbar

Un componente de navegación moderno y responsive construido con ShadCN UI y TailwindCSS.

## Características

- **Responsive**: Se adapta perfectamente a dispositivos móviles y desktop
- **Drawer lateral**: Menú hamburguesa que despliega un drawer desde la izquierda
- **Theme Switch**: Alternador de tema claro/oscuro con animaciones suaves
- **Avatar**: Avatar circular del usuario con imagen placeholder
- **Accesibilidad**: Cumple con estándares de accesibilidad web
- **Animaciones**: Transiciones suaves y estados visuales bien diferenciados

## Componentes incluidos

### Navbar

El componente principal que incluye:

- Botón de menú hamburguesa (izquierda)
- Logo/título (centro, visible solo en desktop)
- Avatar y theme switch (derecha)

### ThemeSwitch

Componente de alternador de tema que utiliza:

- Switch de ShadCN UI
- Iconos de Sol y Luna de Lucide React
- Animaciones suaves entre estados
- Soporte para tema del sistema

## Uso

```tsx
import { Navbar } from "@/components/navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      {/* Resto del contenido */}
    </div>
  );
}
```

## Personalización

### Menú del Drawer

Para modificar los elementos del menú, edita el array `menuItems` en `navbar.tsx`:

```tsx
const menuItems = [
  {
    icon: Home,
    label: "Inicio",
    href: "/",
  },
  // Agregar más elementos...
];
```

### Avatar

Para cambiar la imagen del avatar, modifica la prop `src` del componente `AvatarImage`:

```tsx
<AvatarImage src="URL_DE_TU_IMAGEN" alt="Avatar del usuario" />
```

### Estilos

Todos los estilos utilizan clases de TailwindCSS y variables CSS de ShadCN UI, lo que permite una fácil personalización a través del sistema de temas.

## Dependencias

- ShadCN UI (Button, Avatar, Sheet, Switch, Separator)
- Lucide React (iconos)
- next-themes (manejo de temas)
- TailwindCSS (estilos)

## Estructura de archivos

```
src/components/
├── navbar.tsx          # Componente principal
├── theme-switch.tsx    # Alternador de tema
└── ui/                 # Componentes de ShadCN UI
    ├── button.tsx
    ├── avatar.tsx
    ├── sheet.tsx
    ├── switch.tsx
    └── separator.tsx
```
