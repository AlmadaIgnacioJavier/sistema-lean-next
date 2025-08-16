"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  Pencil,
  BellRing,
  MessageCircle,
  FileText,
} from "lucide-react";

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface OrderActionsProps {
  extraActions?: ActionItem[];
}

export default function OrderActions({ extraActions = [] }: OrderActionsProps) {
  return (
    <div className="absolute top-3 right-3 md:relative md:top-auto md:right-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="h-5 w-5 text-gray-600 dark:text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {extraActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
