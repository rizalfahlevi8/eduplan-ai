import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import Link from "next/link";

interface AppSidebarProps {
    savedData: { id: string, goal: string }[];
}

export const AppSidebar = ({ savedData }: AppSidebarProps) => {
    return (
        <Sidebar className="relative" collapsible="icon">
            <SidebarContent>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href={"#"} className="font-medium">
                                    Saved Generated Plan
                                </a>
                            </SidebarMenuButton>
                            {savedData.length ? (
                                <SidebarMenuSub>
                                    {savedData.map((item) => (
                                        <SidebarMenuSubItem key={item.id}>
                                            <SidebarMenuSubButton asChild >
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
}