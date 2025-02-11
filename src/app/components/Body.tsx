'use client';

import { useSession } from "next-auth/react";
import DrawerWrapper from "./DrawerWrapper";
import PostForm from "./PostForm";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Clock from "./Clock";
import { useDrawerStore } from "../stores/drawerStore";
import MapWrapper from "./MapWrapper";
import PostList from "./PostList";
import { Switch } from "./ui/switch";
import { useState } from "react";

const Body = () => {
  const { data: session } = useSession();
  const open = useDrawerStore(state => state.open);
  const [isPostMode, setIsPostMode] = useState(false);

  return (
    <div className="relative h-[100vh]">
      {session?.user && (
        <>
          <div className="absolute top-0 right-0 p-2 z-50 w-full">
            <div className="flex justify-between align-middle">
              <Avatar>
                <AvatarImage src={session.user.image || ''} />
              </Avatar>
              <div className="flex items-center gap-2">
                <Switch checked={isPostMode} onCheckedChange={(checked)=>{ setIsPostMode(checked) }} />
                <Button onClick={()=>{open()}}>{ isPostMode ? 'POST': 'List' }</Button>
              </div>
            </div>
          </div>
          {!isPostMode && <PostList className="absolute bottom-0 left-0 h-1/3 z-10" />}
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