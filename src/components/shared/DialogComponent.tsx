import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";

import { ReactNode } from "react";

const DialogComponent = ({ children, trigger }: { children: ReactNode; trigger: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogOverlay className="DialogOverlay">
        <DialogContent className="sm:max-w-[425px] lg:max-w-fit DialogContent">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogComponent;
