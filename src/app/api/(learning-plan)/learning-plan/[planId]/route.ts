import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE (
    {params}: {params: { planId: string }}
){
    try {
        
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!params.planId) {
            return new NextResponse("Learning Plan ID dibutuhkan", {status: 400})
        }

        const plan = await db.learningPlan.deleteMany({
            where: {
                id: params.planId,
                userId
            },
        })

        return NextResponse.json(plan)

    } catch (error) {
        console.log('[LEARNINGPLAN_DELETE]', error)
        return new NextResponse("Internal error", {status: 500})
    }
}