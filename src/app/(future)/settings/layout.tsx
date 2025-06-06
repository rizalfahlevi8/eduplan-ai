import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SettingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()
    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}