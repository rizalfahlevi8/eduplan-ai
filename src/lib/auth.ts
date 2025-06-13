import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export const getVerify = async () => {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const childProfile = await db.childProfile.findFirst({
        where: { userId },
    });

    if (!childProfile) redirect("/settings");

    return { userId, childProfile };
};