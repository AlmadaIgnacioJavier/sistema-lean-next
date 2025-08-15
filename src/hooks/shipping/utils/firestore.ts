import { collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export const logisticsCollectionPath = [
  "config",
  "shipping",
  "logistics",
] as const;

export const getLogisticsCollection = () =>
  collection(db, ...logisticsCollectionPath);

export const buildLogisticsQuery = (quantity: number) =>
  query(
    getLogisticsCollection(),
    orderBy("createdAt", "desc"),
    limit(quantity)
  );

export const rulesCollectionPath = ["config", "shipping", "rules"] as const;

export const getRulesCollection = () => collection(db, ...rulesCollectionPath);

export const buildRulesQuery = (quantity: number) =>
  query(getRulesCollection(), orderBy("createdAt", "desc"), limit(quantity));
