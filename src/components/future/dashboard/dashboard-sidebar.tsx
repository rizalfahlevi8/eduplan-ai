"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpen, Calendar, Target, TrendingUp } from "lucide-react";

export function DashboardSidebar() {
  const menuItems = [
    {
      title: "Today's Plan",
      icon: Calendar,
      description: "Current day activities",
    },
    {
      title: "Learning Progress",
      icon: TrendingUp,
      description: "Track your progress",
    },
    {
      title: "Study Goals",
      icon: Target,
      description: "Your learning objectives",
    },
    {
      title: "All Plans",
      icon: BookOpen,
      description: "View all learning plans",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon className="size-4" />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}