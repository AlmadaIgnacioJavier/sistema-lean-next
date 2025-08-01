import {
  CanalVenta,
  EstadoPedido,
  TipoDocumento,
  TipoEnvio,
} from "../enum/order";

// 📁 /pedidos/{id} – Datos estáticos
export interface Pedido {
  id: string;
  canal: CanalVenta;
  cliente: {
    nombre: string;
    telefono: string;
  };
  sellData: {
    totalPaid: number;
    taxes: number;
    shippingCost: number;
  };
  productos: Producto[];
  envio: {
    tipo: TipoEnvio;
    direccion: string;
    provincia: string;
  };
  datosFacturacion?: {
    doc_type: TipoDocumento;
    doc_number: string;
  };
}

export interface Producto {
  titulo: string;
  cantidad: number;
}

// 📁 /pedidos_estado/{id} – Datos dinámicos
export interface PedidoEstado {
  estado: EstadoPedido;
  tags: string[];
  alerts: string[];
  notas: string[];
  logisticaAsignada: string;
  logisticaAsignadaManualmente: boolean;
  lastSyncedAt: string; // ISO date
  date: Date; // ISO date
}

// Logística
export interface Logistica {
  nombre: string;
  logistic_types: TipoEnvio[];
  zonas: Zona[];
  activo: boolean;
  default: boolean;
}

export interface Zona {
  localidad: string;
  provincia: string;
}

// Resultado de unión de /pedidos y /pedidos_estado para el frontend
export interface PedidoUnificado extends Pedido, PedidoEstado {}
