import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Using the provided key directly for this session as requested by user.
// In production, this should be process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI("AIzaSyBLjLJG9tuACWBAqK7tQehRt1RnjzCVSeo");

export async function POST(req) {
    try {
        const { message, currentDocData } = await req.json();

        // Use the modern 'gemini-1.5-flash' or 'gemini-pro' model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{
                        text: `You are Manthan AI, an intelligent assistant for the "Manthan" Export-Import platform.
                    
                    Your Goal: Assist users with trade finance, logistics, and document generation.
                    
                    Current Context: ${currentDocData ? JSON.stringify(currentDocData) : "User is on the dashboard."}

                    Instructions:
                    1. Answer queries about Export (FOB, CIF, Letter of Credit), detailed Logistics, and Compliance.
                    2. If the user asks to create or update a document, confirm the details.
                    3. If extraction is needed, append a JSON block at the end (as per previous instructions).
                    4. Keep answers concise (max 3 sentences) unless detailed explanation is asked.
                    `}]
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I am Manthan AI. How can I assist with your shipments or documentation today?" }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
