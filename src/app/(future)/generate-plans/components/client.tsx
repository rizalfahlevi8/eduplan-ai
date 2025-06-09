'use client'

import { useState } from "react";
import { GenerateForm } from "./generate-form";
import { GenerateResult } from "./generate-result";
import { ChildProfile} from "@/generated/prisma";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

interface GeneratePlansClientProps {
    initialData: ChildProfile;
    historyData: { id: string, goal: string }[];
}

export const GeneratePlansClient = ({ initialData, historyData }: GeneratePlansClientProps) => {
    const [generatedData, setGeneratedData] = useState(null);

    return (
        <SidebarProvider className="flex min-h-screen">
            <AppSidebar savedData={historyData}/>
            <SidebarInset className="flex-1">
                <SidebarTrigger className="ml-2" />
                <div className="container mx-auto py-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <GenerateForm
                            initialData={initialData}
                            onDataGenerated={setGeneratedData}
                        />
                    </div>
                    {generatedData && (
                        <div className="mt-8 max-w-4xl mx-auto space-y-8">
                            <GenerateResult data={generatedData} />
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};