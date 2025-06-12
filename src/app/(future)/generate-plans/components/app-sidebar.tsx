import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
  } from "@/components/ui/sidebar";
  import { PlusCircle } from "lucide-react";
  import Link from "next/link";
  
  interface AppSidebarProps {
    savedData: { id: string; goal: string }[];
  }
  
  export const AppSidebar = ({ savedData }: AppSidebarProps) => {
    return (
      <Sidebar className="relative border-r border-gray-200" collapsible="icon">
        <SidebarContent>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="font-medium text-gray-700">
                    Saved Generated Plan
                  </a>
                </SidebarMenuButton>
  
                {savedData.length ? (
                  <SidebarMenuSub className="mt-2 space-y-1">
                    {/* New Generate with Border */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="border border-dashed border-primary rounded-md px-2 py-1 hover:bg-primary/10">
                        <Link href={`/generate-plans`}>
                          <PlusCircle className="mr-2 h-5 w-5 text-primary" />
                          <span className="text-primary font-semibold">New generate</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
  
                    {/* Saved Items */}
                    {savedData.map((item) => (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton asChild className="hover:bg-muted rounded-md px-2 py-1">
                          <Link href={`/generate-plans/${item.id}`}>
                            <span>{item.goal}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  };
  