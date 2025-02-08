'use client';

import { useSession } from "next-auth/react";
import DrawerWrapper from "./DrawerWrapper";
import PostForm from "./PostForm";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Clock from "./Clock";
import { useDrawerStore } from "../stores/drawerStore";
import MapWrapper from "./MapWrapper";

const Body = () => {
  const { data: session } = useSession();
  const open = useDrawerStore(state => state.open);

  return (
    <div className="relative h-[100vh]">
      {session?.user && (
        <>
          <div className="absolute top-0 right-0 p-2 z-50 w-full">
            <div className="flex justify-between align-middle">
              <Avatar>
                <AvatarImage src={session.user.image || ''} />
              </Avatar>
              <Button onClick={()=>{open()}}>POST</Button>
            </div>
          </div>
          <DrawerWrapper>
            <PostForm />
          </DrawerWrapper>
        </>
      )}
      <Clock className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10" />
      <MapWrapper />
    </div>
  );
}

export default Body;