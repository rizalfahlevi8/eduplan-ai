'use client'

import { useState } from "react";
import { GenerateForm } from "./generate-form";
import { GenerateResult, GenerateResultProps } from "./generate-result";
import { ChildProfile } from "@/generated/prisma";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface GeneratePlansClientProps {
    initialData: ChildProfile;
    historyData: { id: string, goal: string }[];
}

export const GeneratePlansClient = ({ initialData, historyData }: GeneratePlansClientProps) => {
    const [generatedData, setGeneratedData] = useState<GenerateResultProps["data"] | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const onSubmit = async () => {
        if (!generatedData) return;

        try {
            setLoading(true)
            await axios.post(`/api/learning-plan`, {
                goal: generatedData.learningPlan.goal,
                interests: generatedData.learningPlan.interest,
                numberOfDays: generatedData.learningPlan.numberOfDay,
                planJson: generatedData.learningPlan.plan
            })
            router.refresh()
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
            <AppSidebar savedData={historyData} />
            <div className="relative flex flex-col flex-1 h-[calc(100vh-4.1rem)] overflow-hidden">
                <SidebarTrigger className="absolute top-4 left-4 z-20" />
                <SidebarInset className="flex-1 overflow-y-auto">
                    <div className="container mx-auto py-8">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <GenerateForm
                                initialData={initialData}
                                onDataGenerated={setGeneratedData}
                            />
                        </div>

                        {generatedData && (
                            <div className="mt-8 max-w-4xl mx-auto space-y-8">
                                <GenerateResult
                                    data={generatedData}
                                    onSubmit={onSubmit}
                                    loading={loading}
                                />
                            </div>
                        )}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>

    );
};