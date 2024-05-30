import OpenAI from "openai";
import { CHUNK_ONE, CHUNK_THREE, CHUNK_TWO } from "~/constants/prompts";
import { env } from "~/env";
import type { DataForAI } from "~/types";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function POST(req: Request) {
  try {
    const data = (await req.json()) as DataForAI;

    const aiResponse = await openai.chat.completions.create({
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: CHUNK_ONE,
        },
        {
          role: "system",
          content: CHUNK_TWO(data),
        },
        {
          role: "system",
          content: CHUNK_THREE,
        },
      ],
      model: "gpt-4o",
      n: 1,
    });

    return new Response(
      JSON.stringify({ content: aiResponse.choices[0]?.message.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { POST };
