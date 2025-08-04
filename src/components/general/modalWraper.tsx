import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
        <DialogHeader className="px-6 pt-6">
          {title ? (
            <DialogTitle>{title || "Agregar alerta"}</DialogTitle>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ModalWraper;
