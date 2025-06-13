import { getVerify } from "@/lib/auth";
import React from "react";

export default async function SetupLayout({
    children, 
}:{
    children: React.ReactNode
}){
    await getVerify(); 

    return (
        <>{children}</>
    )
}