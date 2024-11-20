"use client";
// import Comment from "@/components/Comment";
import { AppSidebar } from "@/components/Comment";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const ViewArticle = () => {
  return (
    <div>
      <SidebarProvider>
        <SidebarTrigger />
        <AppSidebar />
      </SidebarProvider>
    </div>
  );
};

export default ViewArticle;
