import React from "react";

export default async function SettingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}