'use client';

import { ReactNode, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/app/components/ui/drawer"

interface DrawerWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

const DrawerWrapper = ({ open, setOpen, children }: DrawerWrapperProps) => {

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
          {children}
        <DrawerFooter>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerWrapper;