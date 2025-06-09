import { redirect } from "next/navigation";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GeneratePlansClient } from "../components/client";

const GeneratePlansPage = async () => {
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
    }

    const childProfile = await db.childProfile.findFirst({
        where: {
            userId: userId
        }
    })

    const learningPlan = await db.learningPlan.findMany({
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

    if (!childProfile) {
        redirect('/')
    }

    return <GeneratePlansClient initialData={childProfile} historyData={learningPlan} />
}

export default GeneratePlansPage;