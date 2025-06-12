import db from "@/lib/db";
import { GenerateResult } from "../../components/generate-result";
import { cleanAndParseResponse } from "@/lib/parseReturnPrompts";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { getUserAndChildProfile } from "@/lib/authData";

const GeneratePlansIdPage = async (props: { params: Promise<{ planId: string }> }) => {
    const params = await props.params;

    const { userId } = await getUserAndChildProfile();

    const learningPlan = await db.learningPlan.findUnique({
        where: {
            id: params.planId
        }
    });

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
        <SidebarProvider className="flex h-full overflow-hidden">
            <AppSidebar savedData={historyData} />
            <div className="relative flex flex-col flex-1 h-[calc(100vh-4.1rem)] overflow-hidden">
                <SidebarTrigger className="absolute top-4 left-4 z-20" />
                <SidebarInset className="flex-1 overflow-y-auto">
                    <div className="container mx-auto py-8">
                        <div className="mt-8 max-w-4xl mx-auto space-y-8">
                            <GenerateResult data={formattedData} />
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default GeneratePlansIdPage;
