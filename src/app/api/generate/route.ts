// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '', // Simpan apiKey di .env.local
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });

    console.log(result)

    return NextResponse.json({ result: result.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
