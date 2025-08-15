import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  refetchVentas?: () => void;
  children: React.ReactNode;
};
function ModalWraper({ open, onOpenChange, children, title }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl !p-0">
        <DialogHeader className="px-6 pt-4">
          {title ? (
            <DialogTitle>{title || "Agregar alerta"}</DialogTitle>
          ) : null}
        </DialogHeader>
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ModalWraper;
