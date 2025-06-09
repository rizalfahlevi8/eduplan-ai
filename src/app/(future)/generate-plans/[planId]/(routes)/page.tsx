import db from "@/lib/db";
import { GenerateResult } from "../components/generate-result";
import { cleanAndParseResponse } from "@/lib/parseReturnPrompts";
import { auth } from "@clerk/nextjs/server";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

const GeneratePlansIdPage = async (props: { params: Promise<{ planId: string }> }) => {
    const params = await props.params;

    const learningPlan = await db.learningPlan.findUnique({
        where: {
            id: params.planId
        }
    });

    const { userId } = await auth();

    if (!userId) {
        return <div className="text-center mt-10 text-red-500">User tidak terautentikasi.</div>;
    }

    const historyData = await db.learningPlan.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            goal: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!learningPlan || !learningPlan.planJson) {
        return <div className="text-center mt-10 text-red-500">Rencana belajar tidak ditemukan atau rusak.</div>;
    }

    const jsonString = JSON.stringify(learningPlan.planJson);
    const parsedPlan = cleanAndParseResponse(jsonString, Number(learningPlan.numberOfDays));

    const formattedData = {
        learningPlan: {
            numberOfDay: learningPlan.numberOfDays,
            goal: learningPlan.goal,
            interest: learningPlan.interests,
            plan: { days: parsedPlan }
        }
    };

    return (
        <SidebarProvider className="flex min-h-screen">
            <AppSidebar savedData={historyData} />
            <SidebarInset className="flex-1">
                <SidebarTrigger className="ml-2" />
                <div className="container mx-auto py-8">
                    <div className="mt-8 max-w-4xl mx-auto space-y-8">
                        <GenerateResult data={formattedData} />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default GeneratePlansIdPage;
