import { Timestamp } from "firebase/firestore";

export const parseDate = (date: Date | Timestamp | undefined): Date | null => {
  if (!date) return null;
  return date instanceof Timestamp ? date.toDate() : (date as Date);
};
