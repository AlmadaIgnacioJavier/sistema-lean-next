export enum Colors {
  Rojo = "Rojo",
  Naranja = "Naranja",
  Amarillo = "Amarillo",
  Verde = "Verde",
  Turquesa = "Turquesa",
  Azul = "Azul",
  Índigo = "Índigo",
  Púrpura = "Púrpura",
  Rosa = "Rosa",
  Gris = "Gris",
}

export const COLOR_MAP: Record<Colors, { bg: string; text: string }> = {
  [Colors.Rojo]: { bg: "bg-red-500", text: "text-white" },
  [Colors.Naranja]: { bg: "bg-orange-400", text: "text-black" },
  [Colors.Amarillo]: { bg: "bg-yellow-300", text: "text-black" },
  [Colors.Verde]: { bg: "bg-green-500", text: "text-white" },
  [Colors.Turquesa]: { bg: "bg-teal-400", text: "text-black" },
  [Colors.Azul]: { bg: "bg-blue-500", text: "text-white" },
  [Colors.Índigo]: { bg: "bg-indigo-500", text: "text-white" },
  [Colors.Púrpura]: { bg: "bg-purple-500", text: "text-white" },
  [Colors.Rosa]: { bg: "bg-pink-400", text: "text-black" },
  [Colors.Gris]: { bg: "bg-gray-400", text: "text-black" },
};

export type ShippingType =
  | "me1"
  | "full"
  | "flex"
  | "correo"
  | "retiro"
  | "moto"
  | "acuerdo";

export interface UrgencyRule {
  id: string;
  shippingType: ShippingType;
  keywords: string[];
  labelText: string;
  color: Colors;
  enabled: boolean;
  createdDays: number;
}

export const SHIPPING_TYPES: { value: ShippingType; label: string }[] = [
  { value: "me1", label: "Mercado Envíos" },
  { value: "full", label: "ME Full" },
  { value: "flex", label: "ME Flex" },
  { value: "correo", label: "Correo" },
  { value: "retiro", label: "Retiro en tienda" },
  { value: "moto", label: "Moto mensajería" },
  { value: "acuerdo", label: "Acuerdo con comprador" },
];
