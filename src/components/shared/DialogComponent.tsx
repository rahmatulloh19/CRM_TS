import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ReactNode } from "react";

const DialogComponent = ({ children, trigger }: { children: ReactNode; trigger: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
