import db from "@/lib/db";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChildProfileForm } from "../components/child-profile-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SettingPage = async () => {
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const childProfile = await db.childProfile.findFirst({
        where: {
            userId: userId
        }
    });

    return (
        <div className="flex items-start flex-col p-10">
            <div className="flex items-center justify-between w-full mb-3">
                <Heading title="Profile Anak" description="Atur data profile anak" />
            </div>
            <Separator className="mb-5" />
            <ChildProfileForm initialData={childProfile} />
        </div>
    );
}

export default SettingPage;
