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
import { LearningPlan } from "@/generated/prisma";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AppSidebar = () => {
  const { getToken, isLoaded } = useAuth();
  const [learningPlans, setLearningPlans] = useState<LearningPlan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded) return;
      try {
        const token = await getToken();
        if (!token) return;
        const resLearningPlan = await axios.get('/api/learning-plan', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLearningPlans(resLearningPlan.data);


      } catch (err) {
        console.error("[FETCH_CHILD_PROFILE_ERROR]", err);
      }
    };

    fetchData();
  }, [isLoaded, getToken]);


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
                {/* New Generate with Border */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className="border border-dashed border-primary rounded-md px-2 py-1 hover:bg-primary/10">
                    <Link href={`/generate-plans`}>
                      <PlusCircle className="mr-2 h-5 w-5 text-primary" />
                      <span className="text-primary font-semibold">New generate</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {learningPlans.length > 0 && learningPlans.map((item) => (
                  <SidebarMenuSubItem key={item.id}>
                    <SidebarMenuSubButton asChild className="hover:bg-muted rounded-md px-2 py-1">
                      <Link href={`/generate-plans/${item.id}`}>
                        <span>{item.goal}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>

            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
