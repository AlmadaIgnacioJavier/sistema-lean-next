export const PRODUCTS = [
  {
    id: "1234567891",
    meli_id: "1234567891",
    sellIndex: 1,
    canal: "mercadolibre",
    cliente: {
      nombre: "Ana Gómez",
      telefono: "1122334455",
    },
    productos: [{ titulo: "Auriculares Bluetooth", cantidad: 2 }],
    estado: "armado",
    envio: {
      tipo: "normal",
      direccion: "Calle Falsa 123",
      localidad: "Lanús",
      provincia: "Buenos Aires",
      cp: "1824",
      pais: "Argentina",
    },
    notas: "",
    tags: [],
    alerts: [],
    lastSyncedAt: "2025-07-15T14:00:00Z",
  },
  {
    id: "1234567893",
    meli_id: "1234567893",
    sellIndex: 3,
    canal: "mercadolibre",
    cliente: {
      nombre: "Ana Gómez",
      telefono: "1122334455",
    },
    productos: [{ titulo: "Auriculares Bluetooth", cantidad: 2 }],
    estado: "armado",
    envio: {
      tipo: "normal",
      direccion: "Calle Falsa 123",
      localidad: "Lanús",
      provincia: "Buenos Aires",
      cp: "1824",
      pais: "Argentina",
    },
    notas: "",
    tags: [],
    alerts: [],
    lastSyncedAt: "2025-07-15T14:00:00Z",
  },
  {
    id: "1234567894",
    meli_id: "1234567894",
    sellIndex: 4,
    canal: "mercadolibre",
    cliente: {
      nombre: "Carlos Ruiz",
      telefono: "1199887766",
    },
    productos: [{ titulo: "Teclado mecánico", cantidad: 1 }],
    estado: "empaquetado",
    envio: {
      tipo: "retiro",
      direccion: "Local - Sucursal Caballito",
      localidad: "CABA",
      provincia: "Buenos Aires",
      cp: "1405",
      pais: "Argentina",
    },
    notas: "El cliente pidió envolver para regalo",
    tags: ["prioritario"],
    alerts: [
      {
        text: "Llamar antes de las 14hs",
        color: "yellow-400",
      },
    ],
    lastSyncedAt: "2025-07-14T11:20:00Z",
  },
];
export const enum ORDER_STATUS {
  SIN_ARMAR = "sin armar",
  ARMADO = "armado",
  EMPAQUETADO = "empaquetado",
  DESPACHADO = "despachado",
  ENTREGADO = "entregado",
  CANCELADO = "cancelado",
}
export const PRODUCT_STATE: Record<string, ORDER_STATUS> = {
  SIN_ARMAR: ORDER_STATUS.SIN_ARMAR,
  ARMADO: ORDER_STATUS.ARMADO,
  EMPAQUETADO: ORDER_STATUS.EMPAQUETADO,
  DESPACHADO: ORDER_STATUS.DESPACHADO,
  ENTREGADO: ORDER_STATUS.ENTREGADO,
  CANCELADO: ORDER_STATUS.CANCELADO,
};
export const statusColors = {
  [PRODUCT_STATE.SIN_ARMAR]: "bg-black hover:bg-black/80 transition",
  [PRODUCT_STATE.ARMADO]: "bg-blue-500 hover:bg-blue-400 transition",
  [PRODUCT_STATE.EMPAQUETADO]:
    "bg-yellow-500 text-black hover:bg-yellow-600 transition",
  [PRODUCT_STATE.DESPACHADO]:
    "bg-orange-500 hover:bg-orange-600 transition dark:text-black",
  [PRODUCT_STATE.ENTREGADO]: "bg-green-500 hover:bg-green-600/80 transition",
  [PRODUCT_STATE.CANCELADO]: "bg-red-500 hover:bg-red-600 transition",
};
export const FILTERS_NOT_STATE = {
  notDelivered: [
    PRODUCT_STATE.DESPACHADO,
    PRODUCT_STATE.ENTREGADO,
    PRODUCT_STATE.CANCELADO,
  ],
  shipped: Object.values(PRODUCT_STATE).filter(
    (state) => state != PRODUCT_STATE.DESPACHADO
  ),
  finished: Object.values(PRODUCT_STATE).filter(
    (state) => state != PRODUCT_STATE.ENTREGADO
  ),
  finished_cancelled: Object.values(PRODUCT_STATE).filter(
    (state) =>
      state != PRODUCT_STATE.ENTREGADO || state != PRODUCT_STATE.CANCELADO
  ),
};
