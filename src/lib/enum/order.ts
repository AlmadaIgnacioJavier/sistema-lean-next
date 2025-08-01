// Canales de venta posibles
export enum CanalVenta {
  MERCADO_LIBRE = "mercadolibre",
  WHATSAPP = "whatsapp",
  INSTAGRAM = "instagram",
  PRESENCIAL = "presencial",
  OTRO = "otro",
}

// Tipos de envío/logística
export enum TipoEnvio {
  FLEX = "flex",
  NORMAL = "normal",
  RETIRO = "retiro",
  OTRO = "otro",
}

// Tipos de documento para facturación
export enum TipoDocumento {
  CUIT = "CUIT",
  DNI = "DNI",
  CUIL = "CUIL",
  OTRO = "OTRO",
}

// Estados posibles de un pedido
export enum EstadoPedido {
  PENDIENTE = "pendiente",
  CONFIRMADO = "confirmado",
  EN_CAMINO = "en camino",
  ENTREGADO = "entregado",
  CANCELADO = "cancelado",
  OTRO = "otro",
}
