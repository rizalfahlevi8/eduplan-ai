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

    if (!childProfile) {
        redirect('/')
    }

    return <GeneratePlansClient initialData={childProfile} />
}

export default GeneratePlansPage;