"use client";

import { DashboardContent } from "@/components/future/dashboard/dashboard-content";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/future/dashboard/dashboard-sidebar";

const DashboardPage = () => {
  return (
    <SidebarProvider className="flex h-full overflow-hidden">
      <DashboardSidebar />
      <div className="relative flex flex-col flex-1 h-[calc(100vh-4.1rem)] overflow-hidden">
        <SidebarTrigger className="absolute top-4 left-4 z-20" />
        <SidebarInset className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-8">
            <DashboardContent />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;