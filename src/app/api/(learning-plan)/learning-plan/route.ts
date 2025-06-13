import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

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

        return NextResponse.json(
            learningPlan
        );
    } catch (error) {
        console.error("Error fetching learning plans:", error);
        return new Response("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { goal, interests, numberOfDays, planJson } = body;

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        if (!goal || !interests || !numberOfDays || !planJson) {
            return new Response("Missing required fields", { status: 400 });
        }

        const learningPlan = await db.learningPlan.create({
            data: {
                userId,
                goal,
                interests,
                numberOfDays,
                planJson

            }
        });

        return NextResponse.json(learningPlan);
    } catch (error) {
        console.log("[LEARNINGPLAN_POST]", error);
        return new Response("Internal Error", { status: 500 });
    }
}