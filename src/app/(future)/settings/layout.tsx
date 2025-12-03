// app/settings/layout.tsx
import { getVerifyAuth } from "@/lib/auth"; // ← gunakan fungsi baru
import React from "react";

export default async function SettingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    await getVerifyAuth(); // ← hanya cek login, TIDAK cek childProfile
    return (
        <>{children}</> 
    );
}