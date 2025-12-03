// lib/auth. ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

// Untuk halaman yang BUTUH childProfile (halaman lain selain /settings)
export const getVerify = async () => {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const childProfile = await db.childProfile.findFirst({
        where: { userId },
    });

    if (!childProfile) redirect("/settings");

    return { userId, childProfile };
};

// Untuk halaman /settings itu sendiri (hanya cek login)
export const getVerifyAuth = async () => {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    return { userId };
};