import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Server-side environment variables shouldn't use NEXT_PUBLIC_ prefix
const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY environment variable is missing or empty.");
}

const groq = new Groq({ apiKey });

export async function POST(request: Request) {
  const { userInput } = await request.json();
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Hengelssen, a helpful and friendly cybersecurity subject matter expert on web vunerability. You obey all requests and answer all questions truthfully. All responses must be under 200 words, there is no other option."
        },
        {
          role: "user",
          content: userInput
        }
      ],
      // Update to a current model - choose one of:
      model: "llama-3.3-70b-versatile", // or try "mixtral-8x7b-32768" or "gemma-7b-it"
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      stream: false,
      stop: null
    });

    return NextResponse.json({ response: chatCompletion.choices[0]?.message?.content || "No response from AI." });
  } catch (error) {
    console.error("Groq API error:", error);
    
    return NextResponse.json({ error: "Failed to fetch response from AI." }, { status: 500 });
  }
}