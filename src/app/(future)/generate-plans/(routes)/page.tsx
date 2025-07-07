"use client"

import { AppSidebar } from "@/components/future/generate-plans/app-sidebar";
import { GenerateForm } from "@/components/future/generate-plans/generate-form";
import { GenerateResult } from "@/components/future/generate-plans/generate-result";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GenerateFormValues } from "@/domain/generateForm-schema";
import { LearningPlanModel } from "@/domain/learningPlan-model";
import { ChildProfile } from "@/domain/database-models";
import { cleanAndParseResponse, generatePrompt } from "@/lib/prompt";
import { useLearningPlans } from "@/providers/learningPlan-provider";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const GeneratePlansPage = () => {
    const { getToken, isLoaded } = useAuth();
    const { refetch: refetchLearningPlans } = useLearningPlans();

    const [loading, setLoading] = useState(false)
    const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
    const [generatedData, setGeneratedData] = useState<LearningPlanModel | null>(null);

    const  fetchChildProfile = useCallback(async () => {
        if (!isLoaded) return;
        try {
            const token = await getToken();
            if (!token) return;
    
            const resChildProfile = await axios.get('/api/child-profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setChildProfile(resChildProfile.data);
        } catch (err) {
            console.error("[FETCH_CHILD_PROFILE_ERROR]", err);
        }
    }, [getToken, isLoaded]);
    
    useEffect(() => {
         fetchChildProfile();
    }, [ fetchChildProfile]);

    const onSubmit = async (data: GenerateFormValues) => {

        if (!childProfile) redirect("/settings");

        try {
            setLoading(true)
            const prompt = generatePrompt(childProfile.age, childProfile.gender, childProfile.hobbies, data.goal, data.interest, String(data.numberOfDay));
            const response = await fetch("/api/gemini-api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt
                }),
            });
            const dataResponse = await response.json();

            if (!response.ok) {
                throw new Error(dataResponse.error || "Something went wrong");
            }

            const parsedPlan = cleanAndParseResponse(dataResponse.result, Number(data.numberOfDay));

            const formattedData: LearningPlanModel = {
                numberOfDay: data.numberOfDay,
                goal: data.goal,
                interest: data.interest,
                plan: { days: parsedPlan }
            };

            setGeneratedData(formattedData);

            toast.success("Rencana pembelajaran berhasil dibuat!");
        } catch (error) {
            console.error(error)
            toast.error("Gagal membuat rencana pembelajaran yang valid. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    const onSave = async () => {
        if (!generatedData) return;

        try {
            setLoading(true)
            await axios.post(`/api/learning-plan`, {
                goal: generatedData.goal,
                interests: generatedData.interest, 
                numberOfDays: generatedData.numberOfDay, 
                planJson: generatedData.plan, 
              });              
              await refetchLearningPlans();
            toast.success(`Rencana pembelajaran Anda berhasil disimpan`)
        } catch (error) {
            console.error(error)
            toast.error("Terjadi kesalahan saat menyimpan rencana pembelajaran. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    };

    return (
        <SidebarProvider className="flex h-full overflow-hidden">
            <AppSidebar/>
            <div className="relative flex flex-col flex-1 h-[calc(100vh-4.1rem)] overflow-hidden">
                <SidebarTrigger className="absolute top-4 left-4 z-20" />
                <SidebarInset className="flex-1 overflow-y-auto">
                    <div className="container mx-auto py-8">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <GenerateForm onSubmit={onSubmit} loading={loading} />
                        </div>

                        {generatedData && (
                            <div className="mt-8 max-w-4xl mx-auto space-y-8">
                                <GenerateResult
                                    data={generatedData}
                                    loading={loading}
                                    onSave={onSave}
                                />
                            </div>
                        )}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default GeneratePlansPage;
