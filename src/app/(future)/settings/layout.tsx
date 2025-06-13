import { getVerify } from "@/lib/auth";
import React from "react";

export default async function SettingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    await getVerify(); 
    return (
        <>{children}</> 
    );
}
