"use client";

import { use } from "react";
import { LearningPlanModel } from "@/domain/learningPlan-model";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/future/generate-plans/app-sidebar";
import { GenerateResult } from "@/components/future/generate-plans/generate-result";

const GeneratePlansIdPage = ({ params }: { params: Promise<{ learningPlanId: string }> }) => {
    const { learningPlanId } = use(params);

    const { getToken, isLoaded } = useAuth();
    const [generatedData, setGeneratedData] = useState<LearningPlanModel | null>(null);

    const fetchData = useCallback(async () => {
        if (!isLoaded) return;
        try {
            const token = await getToken();
            if (!token) return;

            const resGeneratedData = await axios.get(`/api/learning-plan/${learningPlanId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("resGeneratedData", resGeneratedData.data);
            
            setGeneratedData(resGeneratedData.data);
        } catch (err) {
            console.error("[FETCH_CHILD_PROFILE_ERROR]", err);
        }
    }, [getToken, isLoaded, learningPlanId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <SidebarProvider className="flex h-full overflow-hidden">
            <AppSidebar/>
            <div className="relative flex flex-col flex-1 h-[calc(100vh-4.1rem)] overflow-hidden">
                <SidebarTrigger className="absolute top-4 left-4 z-20" />
                <SidebarInset className="flex-1 overflow-y-auto">
                    <div className="container mx-auto py-8">
                        <div className="mt-8 max-w-4xl mx-auto space-y-8">
                            {!generatedData ? (
                                <p className="text-center text-gray-500">Memuat rencana pembelajaran...</p>
                            ) : (
                                <GenerateResult data={generatedData} />
                            )}

                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default GeneratePlansIdPage;
