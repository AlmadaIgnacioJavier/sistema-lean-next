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
    textColor: "text-black",
  },
  [Colors.Amarillo]: {
    value: "bg-yellow-400",
    name: Colors.Amarillo,
    textColor: "text-black",
  },
  [Colors.Verde]: {
    value: "bg-green-500",
    name: Colors.Verde,
    textColor: "text-white",
  },
  [Colors.Turquesa]: {
    value: "bg-teal-400",
    name: Colors.Turquesa,
    textColor: "text-black",
  },
  [Colors.Azul]: {
    value: "bg-blue-500",
    name: Colors.Azul,
    textColor: "text-white",
  },
  [Colors["Índigo"]]: {
    value: "bg-indigo-500",
    name: Colors["Índigo"],
    textColor: "text-white",
  },
  [Colors["Púrpura"]]: {
    value: "bg-purple-500",
    name: Colors["Púrpura"],
    textColor: "text-white",
  },
  [Colors.Rosa]: {
    value: "bg-pink-400",
    name: Colors.Rosa,
    textColor: "text-black",
  },
  [Colors.Gris]: {
    value: "bg-gray-400",
    name: Colors.Gris,
    textColor: "text-black",
  },
};
