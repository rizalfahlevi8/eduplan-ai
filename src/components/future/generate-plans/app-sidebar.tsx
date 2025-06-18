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
import { PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useLearningPlans } from "../../../providers/learningPlan-provider";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export const AppSidebar = () => {
  const { learningPlans } = useLearningPlans();
  const pathname = usePathname(); // ⬅️ Dapatkan path saat ini

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

              <SidebarMenuSub className="mt-2 space-y-1">
                {/* Tombol New Generate */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    className={`border border-dashed rounded-md px-2 py-1 hover:bg-primary/10 ${
                      pathname === "/generate-plans" ? "border-primary bg-primary/10" : "border-gray-300"
                    }`}
                  >
                    <Link href="/generate-plans">
                      <PlusCircle className="mr-2 h-5 w-5 text-primary" />
                      <span className="text-primary font-semibold">New generate</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                {/* Daftar Rencana */}
                {learningPlans.length > 0 &&
                  learningPlans.map((item) => {
                    const isActive = pathname === `/generate-plans/${item.id}`;
                    return (
                      <SidebarMenuSubItem key={item.id} className="relative group/item px-1">
                        <div
                          className={`flex items-center justify-between w-full rounded-md pr-5 ${
                            isActive ? "bg-muted font-semibold text-primary" : "hover:bg-muted"
                          }`}
                        >
                          <SidebarMenuSubButton asChild className="flex-1 text-left">
                            <Link href={`/generate-plans/${item.id}`}>
                              <span className="line-clamp-1">{item.goal}</span>
                            </Link>
                          </SidebarMenuSubButton>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                          >
                            <Trash2 className="text-muted-foreground" />
                          </Button>
                        </div>
                      </SidebarMenuSubItem>
                    );
                  })}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
