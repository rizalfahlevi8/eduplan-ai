'use client'

import { useState } from "react";
import { GenerateForm } from "./generate-form";
import { GenerateResult } from "./generate-result";
import { ChildProfile } from "@/generated/prisma";

interface GeneratePlansClientProps {
    initialData: ChildProfile;
}

export const GeneratePlansClient = ({ initialData }: GeneratePlansClientProps) => {
    const [generatedData, setGeneratedData] = useState(null);

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <GenerateForm
                    initialData={initialData}
                    onDataGenerated={setGeneratedData}
                />
            </div>
            {generatedData && (
                <div className="mt-8 max-w-4xl mx-auto space-y-8">
                    <GenerateResult data={generatedData}/>
                </div>
            )}
        </div>
    );
};