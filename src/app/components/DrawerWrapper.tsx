'use client';

import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/app/components/ui/drawer"
import { useDrawerStore } from "../stores/drawerStore";

interface DrawerWrapperProps {
  children: ReactNode;
}

const DrawerWrapper = ({ children }: DrawerWrapperProps) => {
  const isOpen = useDrawerStore(state => state.isOpen);
  const close = useDrawerStore(state => state.close);

  return (
    <Drawer open={isOpen} onClose={() => close()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {children}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerWrapper;