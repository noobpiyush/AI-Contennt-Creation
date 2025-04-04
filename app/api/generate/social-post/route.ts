import { NextRequest, NextResponse } from "next/server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.prompt) {
    return NextResponse.json(
      { error: "No prompt in the request" },
      { status: 400 }
    );
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
      You are a professional social media strategist with deep knowledge of trends across platforms like Instagram, TikTok, Twitter, and YouTube. 
      Your goal is to help users craft engaging, high-performing content.
  
      Suggest a creative, trending content idea based on the topic: "${body.prompt}". 
      The output should include:
      - A catchy title or hook
      - A brief description of the post or video
      - Relevant hashtags
      - Tips to increase engagement (optional)
  
      Keep it concise and platform-agnostic unless a specific platform is mentioned in the prompt.
    `
  });
  

  return NextResponse.json(response);
}
