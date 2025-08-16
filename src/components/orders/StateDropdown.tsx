"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag } from "lucide-react";
import { PRODUCT_STATE, statusColors } from "@/lib/constants";
import { changeState } from "@/lib/utils/firebase";
import { showWindowAlert, removeAllWindows } from "@/lib/utils/general";

interface StateDropdownProps {
  estado?: string;
  orderId: string;
}

export default function StateDropdown({ estado, orderId }: StateDropdownProps) {
  const stateActions = Object.values(PRODUCT_STATE).map((state) => ({
    label: state,
    icon: <Tag className="h-4 w-4 text-blue-500" />,
    onClick: async () => {
      showWindowAlert({
        title: "Cambiando estado",
        text: "Cambiando estado del pedido",
        timeout: 0,
        loader: true,
      });
      await changeState(orderId, state);
      removeAllWindows();
    },
  }));

  return (
    <div className="flex items-center min-w-[120px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            className={`uppercase text-white font-medium px-3 py-1 select-none cursor-pointer text-sm ${
              statusColors[estado || PRODUCT_STATE.SIN_ARMAR]
            }`}
          >
            {estado || PRODUCT_STATE.SIN_ARMAR}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="divide-y divide-gray-200 dark:divide-slate-700"
        >
          {stateActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              <span className="ml-2 uppercase text-xs font-semibold py-0.5 px-2">
                {action.label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
