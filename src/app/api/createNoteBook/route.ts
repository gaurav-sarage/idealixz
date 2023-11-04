// route: /api/createNoteBook

import { generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = auth(); // checking whether the user is authenticated or not
    if(!userId) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    const body = await req.json();
    const {name} = body;

    const imageDescription = await generateImagePrompt(name);
    console.log(imageDescription);
    return new NextResponse("OK");
}