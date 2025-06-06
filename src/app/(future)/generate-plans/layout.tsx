import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function GeneratePlansLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
    }

    const childProfile = await db.childProfile.findFirst({
        where: {
            userId: userId
        }
    })

    if (!childProfile) {
        redirect('/') 
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {children}
        </div>
    );
}