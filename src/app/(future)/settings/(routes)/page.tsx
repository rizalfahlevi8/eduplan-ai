'use client'

import { ChildProfileForm } from "@/components/future/settings/childProfile-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChildProfileFormValues } from "@/domain/childProfile-schema";
import { ChildProfile } from "@/generated/prisma";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SettingPage = () => {
    const { getToken, isLoaded } = useAuth();

    const [loading, setLoading] = useState(false)

    const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoaded) return;
            try {
                const token = await getToken();
                if (!token) return;

                const res = await axios.get('/api/child-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChildProfile(res.data);
            } catch (err) {
                console.error("[FETCH_CHILD_PROFILE_ERROR]", err);
            }
        };

        fetchData();
    }, [isLoaded, getToken]);


    const onSubmit = async (data: ChildProfileFormValues) => {
        try {
            setLoading(true)
            if (childProfile) {
                await axios.patch(`/api/child-profile`, data);
                toast.success("Profil anak Anda berhasil diperbarui");
            } else {
                const res = await axios.post(`/api/child-profile`, data);
                setChildProfile(res.data);
                toast.success("Profil anak Anda berhasil disimpan");
            }

        } catch (error) {
            console.error(error)
            toast.error("Cek kembali data yang diinput")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex items-start flex-col p-10">
            <div className="flex items-center justify-between w-full mb-3">
                <Heading title="Profile Anak" description="Atur data profile anak" />
            </div>
            <Separator className="mb-5" />
            <ChildProfileForm initialData={childProfile} onSubmit={onSubmit} loading={loading} />
        </div>
    );
}

export default SettingPage;
