"use client";

import Table from "@/components/orders/table";
import { FILTERS_NOT_STATE } from "@/lib/constants";

export default function Index() {
  return (
    <Table addFilter={false} initialFilterState={FILTERS_NOT_STATE.finished} />
  );
}
