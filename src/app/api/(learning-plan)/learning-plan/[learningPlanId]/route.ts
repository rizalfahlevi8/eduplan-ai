import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ learningPlanId: string }> }
) {
  try {
    const { learningPlanId } = await context.params;
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!learningPlanId) {
      return new NextResponse("Learning Plan ID dibutuhkan", { status: 400 });
    }

    const learningPlan = await db.learningPlan.findFirst({
      where: {
        id: learningPlanId,
        userId,
      },
    });

    if (!learningPlan) {
      return new NextResponse("Rencana tidak ditemukan", { status: 404 });
    }

    return NextResponse.json({
      numberOfDay: learningPlan.numberOfDays,
      goal: learningPlan.goal,
      interest: learningPlan.interests,
      plan: learningPlan.planJson
    });

  } catch (error) {
    console.error("[LEARNINGPLANID_GET]", error);
    return new Response("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ learningPlanId: string }> }
) {
  try {
    const { learningPlanId } = await context.params;
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!learningPlanId) {
        return new NextResponse("Learning Plan ID dibutuhkan", { status: 400 });
      }
  
      const plan = await db.learningPlan.deleteMany({
        where: {
          id: learningPlanId,
          userId,
        },
      });
  
      return NextResponse.json(plan);
    } catch (error) {
      console.log("[LEARNINGPLAN_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  