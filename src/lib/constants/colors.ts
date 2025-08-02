import { Colors } from "../enum/colors";

export interface ColorProps {
  value: string;
  name: Colors;
  textColor: string;
}
export const COLORS: Record<Colors, ColorProps> = {
  [Colors.Rojo]: {
    value: "bg-red-500",
    name: Colors.Rojo,
    textColor: "text-white",
  },
  [Colors.Naranja]: {
    value: "bg-orange-500",
    name: Colors.Naranja,
    textColor: "text-white",
  },
  [Colors.Amarillo]: {
    value: "bg-yellow-500",
    name: Colors.Amarillo,
    textColor: "text-white",
  },
  [Colors.Verde]: {
    value: "bg-green-500",
    name: Colors.Verde,
    textColor: "text-white",
  },
  [Colors.Turquesa]: {
    value: "bg-teal-500",
    name: Colors.Turquesa,
    textColor: "text-white",
  },
  [Colors.Azul]: {
    value: "bg-blue-500",
    name: Colors.Azul,
    textColor: "text-white",
  },
  [Colors.Índigo]: {
    value: "bg-indigo-500",
    name: Colors.Índigo,
    textColor: "text-white",
  },
  [Colors.Púrpura]: {
    value: "bg-purple-500",
    name: Colors.Púrpura,
    textColor: "text-white",
  },
  [Colors.Rosa]: {
    value: "bg-pink-500",
    name: Colors.Rosa,
    textColor: "text-white",
  },
  [Colors.Gris]: {
    value: "bg-gray-500",
    name: Colors.Gris,
    textColor: "text-white",
  },
};
