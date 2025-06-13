import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const childProfile = await db.childProfile.findFirst({
            where: {
                userId
            }
        });

        return NextResponse.json(childProfile);
    } catch (error) {
        console.log("[CHILDPROFILE_GET]", error);
        return new Response("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request){
    try {
        const { userId } = await auth();
        const body = await req.json();

        const {age, gender, hobbies} = body;

        if(!userId){
            return new Response("Unauthorized", { status: 401 });
        }

        if(!age){
            return new Response("Umur anak Anda perlu diinput", { status: 400 });
        }

        if(!gender){
            return new Response("Jenis Kelamin anak Anda perlu diinput", { status: 400 });
        }
        if(!hobbies){
            return new Response("Hobi anak Anda perlu diinput", { status: 400 });
        }

        const childProfile = await db.childProfile.create({
            data: {
                userId,
                age,
                gender,
                hobbies: hobbies.length > 0 ? hobbies : []
            }
        })

        return NextResponse.json(childProfile);
    } catch (error) {
        console.log("[CHILDPROFILE_POST]",error);
        return new Response("Internal Error", { status: 500 });
    }
}

export async function PATCH (
    req: Request
){
    try {
        
        const {userId} = await auth()
        const body = await req.json();

        const {age, gender, hobbies} = body;

        if(!userId){
            return new Response("Unauthorized", { status: 401 });
        }

        if(!age){
            return new Response("Umur anak Anda perlu diinput", { status: 400 });
        }

        if(!gender){
            return new Response("Jenis Kelamin anak Anda perlu diinput", { status: 400 });
        }
        if(!hobbies){
            return new Response("Hobi anak Anda perlu diinput", { status: 400 });
        }

        const store = await db.childProfile.updateMany({
            where: {
                userId
            },
            data: {
                userId,
                age,
                gender,
                hobbies: hobbies.length > 0 ? hobbies : []
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[CHILDPROFILE_PATCH]', error)
        return new NextResponse("Internal error", {status: 500})
    }
}