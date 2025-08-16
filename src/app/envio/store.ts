"use client";

import { create } from "zustand";
import { Option, Rule } from "@/lib/constants/shipment";

type ShippingStore = {
  // Options
  shippingTypes: Option[];
  provinces: Option[];
  localitiesByProvince: Option[];
  carriers: Option[];

  // Current selections
  shippingType: string;
  province: string;
  allLocalities: boolean;
  localityValues: Option[];
  carrier: string;

  // Rules
  rules: Rule[];

  // Actions
  setShippingType: (v: string) => void;
  setProvince: (v: string) => void;
  setAllLocalities: (v: boolean) => void;
  setLocalityValues: (v: Option[]) => void;
  setCarrier: (v: string) => void;
  setCarriers: (opts: Option[]) => void;
  setLocalitiesByProvince: (opts: Option[]) => void;
  resetLocalitiesSelection: () => void;
  addRule: () => void;
  removeRule: (id: string) => void;
  getRuleById: (id: string) => Rule | undefined;
  cleanForm: () => void;
};

// Demo/static data centralization
const DEMO_SHIPPING_TYPES: Option[] = [
  { value: "entrega_a_convenir", label: "Entrega a convenir" },
  { value: "flex", label: "Flex" },
  { value: "mercado_envios", label: "Mercado envíos" },
  { value: "full", label: "Full" },
];

const DEMO_PROVINCES: Option[] = [
  { value: "AR-B", label: "Buenos Aires" },
  { value: "AR-C", label: "Capital Federal" },
  { value: "AR-K", label: "Catamarca" },
  { value: "AR-H", label: "Chaco" },
  { value: "AR-U", label: "Chubut" },
  { value: "AR-W", label: "Corrientes" },
  { value: "AR-X", label: "Córdoba" },
  { value: "AR-E", label: "Entre Ríos" },
  { value: "AR-P", label: "Formosa" },
  { value: "AR-Y", label: "Jujuy" },
  { value: "AR-L", label: "La Pampa" },
  { value: "AR-F", label: "La Rioja" },
  { value: "AR-M", label: "Mendoza" },
  { value: "AR-N", label: "Misiones" },
  { value: "AR-Q", label: "Neuquén" },
  { value: "AR-R", label: "Río Negro" },
  { value: "AR-A", label: "Salta" },
  { value: "AR-J", label: "San Juan" },
  { value: "AR-D", label: "San Luis" },
  { value: "AR-Z", label: "Santa Cruz" },
  { value: "AR-S", label: "Santa Fe" },
  { value: "AR-G", label: "Santiago del Estero" },
  { value: "AR-V", label: "Tierra del Fuego" },
  { value: "AR-T", label: "Tucumán" },
];

const DEMO_LOCALITIES: Option[] = [];

export const useShippingStore = create<ShippingStore>(
  (
    set: (
      partial:
        | Partial<ShippingStore>
        | ((state: ShippingStore) => Partial<ShippingStore>)
    ) => void,
    get
  ) => ({
    // Options
    shippingTypes: DEMO_SHIPPING_TYPES,
    provinces: DEMO_PROVINCES,
    localitiesByProvince: DEMO_LOCALITIES,
    carriers: [],

    // Current selections
    shippingType: DEMO_SHIPPING_TYPES[0]?.value ?? "",
    province: DEMO_PROVINCES[0]?.value ?? "",
    allLocalities: false,
    localityValues: [],
    carrier: "",

    // Rules
    rules: [],

    // Actions
    setShippingType: (v: string) => set({ shippingType: v }),
    setProvince: (v: string) => set({ province: v }),
    setAllLocalities: (v: boolean) => set({ allLocalities: v }),
    setLocalityValues: (v: Option[]) => set({ localityValues: v }),
    setCarrier: (v: string) => set({ carrier: v }),
    setCarriers: (opts: Option[]) => set({ carriers: opts }),
    setLocalitiesByProvince: (opts: Option[]) =>
      set({ localitiesByProvince: opts }),
    resetLocalitiesSelection: () =>
      set({ allLocalities: false, localityValues: [] }),
    addRule: () => {
      const { shippingType, province, allLocalities, localityValues, carrier } =
        get();
      const payload: Rule = {
        id: crypto.randomUUID(),
        shippingType,
        province,
        allLocalities,
        localityValues: allLocalities ? [] : localityValues,
        carrier,
      };
      set((s: ShippingStore) => ({ rules: [payload, ...s.rules] }));
    },
    removeRule: (id: string) =>
      set((s: ShippingStore) => ({
        rules: s.rules.filter((r: Rule) => r.id !== id),
      })),
    getRuleById: (id: string) => get().rules.find((r: Rule) => r.id === id),
    cleanForm: () =>
      set({
        shippingType: "",
        province: "",
        allLocalities: false,
        localityValues: [],
        carrier: "",
      }),
  })
);
