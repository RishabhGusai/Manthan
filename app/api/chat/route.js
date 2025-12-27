import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Using the provided key directly for this session as requested by user.
// In production, this should be process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI("AIzaSyBLjLJG9tuACWBAqK7tQehRt1RnjzCVSeo");

export async function POST(req) {
    try {
        const { message, currentDocData } = await req.json();

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{
                        text: `You are Manthan's AI Trade Assistant. Your goal is to help users generate shipping documents (Invoice, Packing List, etc.).
                    
                    Current Document Context: ${JSON.stringify(currentDocData)}

                    RULES:
                    1. Be professional and helpful.
                    2. If the user provides details for the document (like importer name, items, prices), EXTRACT them and include a JSON object at the END of your response in this format:
                    
                    ||JSON||
                    {
                        "importer": "...",
                        "items": [{ "desc": "...", "amount": "..." }]
                    }
                    ||JSON||

                    3. Only update fields that the user explicitly mentioned. Keep others null or as they are.
                    4. If the user asks general questions about trade, answer them.
                    `}]
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I am your AI Trade Assistant. I can help you generate shipping documents instantly. Please let me know what you need." }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
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
