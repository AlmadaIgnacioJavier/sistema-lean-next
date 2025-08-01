# 🛍️ Sistema de Pedidos Centralizados – Documentación Completa

## 📘 Índice

- [1. Documentación No Técnica](#1-documentación-no-técnica)
  - [1.1 Propósito](#11-propósito)
  - [1.2 Flujo General](#12-flujo-general)
  - [1.3 Público Objetivo](#13-público-objetivo)
- [2. Documentación Técnica](#2-documentación-técnica)
  - [2.1 Stack Tecnológico](#21-stack-tecnológico)
  - [2.2 Estructura de Datos (Firestore)](#22-estructura-de-datos-firestore)
  - [2.3 Sincronización de Pedidos](#23-sincronización-de-pedidos)
  - [2.4 Visualización de Pedidos (Frontend)](#24-visualización-de-pedidos-frontend)
  - [2.5 Asignación Automática de Logística](#25-asignación-automática-de-logística)
  - [2.6 Seguridad y Control de Edición](#26-seguridad-y-control-de-edición)
  - [2.7 Estructura de Carpetas Sugerida](#27-estructura-de-carpetas-sugerida)

---

## 1. Documentación No Técnica

### 1.1 Propósito

Este sistema centraliza todas las ventas, tanto de **Mercado Libre** como de canales alternativos (WhatsApp, ventas presenciales, Instagram, etc.), en una única fuente de datos en Firebase. Esto permite:

- Visualización unificada de pedidos desde el frontend.
- Edición segura de campos internos como notas, alertas o tags.
- Automatización de la asignación de logística según el destino del envío.
- Mejora del control operativo y análisis de performance en el proceso de ventas.

### 1.2 Flujo General

1. **Extracción automática** de nuevas ventas desde la API de Mercado Libre mediante una función programada.
2. **Transformación y guardado** de la información en Firebase usando dos documentos separados por pedido: uno para datos estáticos y otro para datos dinámicos.
3. **Ingreso manual de ventas** desde otros canales manteniendo la misma estructura de documentos.
4. **Consulta del frontend** combinando ambos documentos.
5. **Asignación automática de logística** al momento de sincronizar, en función de la zona y tipo de envío.

### 1.3 Público Objetivo

- Equipos de logística o distribución que necesitan asignar repartidores por zonas.
- Vendedores o administradores de e-commerce que trabajan con múltiples canales de venta.
- Sistemas que requieran un backend unificado y editable para distintas plataformas de venta.
- Desarrolladores encargados del mantenimiento de funciones de sincronización y visualización de ventas.

---

## 2. Documentación Técnica

### 2.1 Stack Tecnológico

| Capa          | Tecnología                  |
| ------------- | --------------------------- |
| Backend       | Node.js (cron o Cloud Func) |
| Base de datos | Firebase Firestore          |
| Frontend      | React / Next.js             |
| Hosting       | Vercel / Firebase Hosting   |
| Integración   | API Mercado Libre REST      |

### 2.2 Estructura de Datos (Firestore)

#### 📁 `/pedidos/{id}` – Datos estáticos

```json
{
  "id": "123456789",
  "canal": "mercadolibre",
  "cliente": {
    "nombre": "Juan Pérez",
    "telefono": "1123456789"
  },
  "sellData": {
    "totalPaid": 15000,
    "taxes": 3000,
    "shippingCost": 1200
  },
  "productos": [{ "titulo": "Zapatillas Urbanas", "cantidad": 2 }],
  "envio": {
    "tipo": "flex",
    "direccion": "Av. Siempreviva 742",
    "provincia": "Buenos Aires"
  },
  "datosFacturacion": {
    "doc_type": "CUIT",
    "doc_number": "20304567891"
  }
}
```

#### 📁 `/pedidos_estado/{id}` – Datos dinámicos

```json
{
  "estado": "en camino",
  "tags": ["alta-prioridad"],
  "alerts": [],
  "notas": ["Cliente pidió cambiar el domicilio."],
  "logisticaAsignada": "Juancito",
  "logisticaAsignadaManualmente": false,
  "lastSyncedAt": "2025-07-30T21:15:00.000Z",
  "date": "2025-07-29T19:30:00.000Z"
}
```

> ✅ Esta separación entre datos estáticos y dinámicos permite editar y actualizar sin riesgo de sobrescribir campos manuales.

### 2.3 Sincronización de Pedidos

1. Obtener ventas recientes desde Mercado Libre.
2. Omitir las canceladas si se desea.
3. Para cada venta:
   - Crear (o actualizar) `/pedidos/{id}` y `/pedidos_estado/{id}`.
   - Conservar campos personalizados si ya existían (`notas`, `tags`, etc.).
4. Asignar logística automáticamente.
5. Actualizar el campo `lastSyncedAt`.

### 2.4 Visualización de Pedidos (Frontend)

- Consultar Firebase por `/pedidos` y `/pedidos_estado`.
- Unificar los datos por `id`.
- Filtrar por estado, fecha, canal y tags.
- Mostrar campos adicionales (notas, alertas, etc.).

### 2.5 Asignación Automática de Logística

```json
{
  "nombre": "Juancito",
  "logistic_types": ["flex", "normal"],
  "zonas": [{ "localidad": "José C Paz", "provincia": "Buenos Aires" }],
  "activo": true,
  "default": false
}
```

Algoritmo:

1. Buscar documentos activos (`activo: true`) que contengan el tipo de envío.
2. Filtrar por coincidencia exacta de provincia y localidad.
3. Si hay coincidencia: usar ese nombre como `logisticaAsignada`.
4. Si no: usar el documento con `default: true`.
5. Si no hay ningún documento válido: marcar como `"sin asignar"`.

### 2.6 Seguridad y Control de Edición

- Datos estáticos no editables desde frontend.
- Datos dinámicos sí editables.
- Se conserva la edición manual si existe.
- Campo `logisticaAsignadaManualmente` actúa como flag de protección.

### 2.7 Estructura de Carpetas Sugerida

```
/backend
  /sync
    syncVentas.ts
    asignarLogistica.ts
/frontend
  /pages/pedidos
    PedidosDashboard.tsx
    PedidoCard.tsx
/firebase
  firestore.rules
  firebase.ts
```
