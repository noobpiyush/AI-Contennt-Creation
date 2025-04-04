import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { imageSchema } from "@/zod-types/image"; // Import Zod schema

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body using Zod
    const parsedBody = imageSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid input. Please provide correct parameters." },
        { status: 400 }
      );
    }

    // Extract validated fields
    const { aspectRatio, prompt, guidanceScale, seed, style, negativePrompt } =
      parsedBody.data;

    // Combine inputs into a single prompt string
    const contents = `${prompt} ${aspectRatio} ${guidanceScale} ${seed} ${style} ${negativePrompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: contents,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    console.log("response is " + response);

    if (response && response.candidates) {
      //@ts-ignore
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          //@ts-ignore
          const buffer = Buffer.from(imageData, "base64");

          // Return image with correct headers
          return new NextResponse(buffer, {
            status: 200,
            headers: {
              "Content-Type": part.inlineData.mimeType || "image/png",
              "Content-Length": buffer.length.toString(),
            },
          });
        }
      }
    }

    return NextResponse.json(
      { error: "No image data received" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate image. Please try again later." },
      { status: 500 }
    );
  }
}
