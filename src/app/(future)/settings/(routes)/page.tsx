import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChildProfileForm } from "../components/child-profile-form";
import { getUserAndChildProfile } from "@/lib/authData";

const SettingPage = async () => {
    const { childProfile } = await getUserAndChildProfile();

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
