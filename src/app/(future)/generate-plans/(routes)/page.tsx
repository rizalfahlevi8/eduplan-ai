import db from "@/lib/db";
import { GeneratePlansClient } from "../components/client";
import { getUserAndChildProfile } from "@/lib/authData";

const GeneratePlansPage = async () => {
    const { userId, childProfile } = await getUserAndChildProfile();

    const learningPlan = await db.learningPlan.findMany({
        where: { userId },
        select: {
            id: true,
            goal: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <GeneratePlansClient
            initialData={childProfile}
            historyData={learningPlan}
        />
    );
};

export default GeneratePlansPage;
