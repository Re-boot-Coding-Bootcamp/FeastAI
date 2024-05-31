import OpenAI from "openai";
import { getMealPlanPrompt } from "~/constants/prompts";
import { env } from "~/env";
import type { DataForAI } from "~/types";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function POST(req: Request) {
  try {
    const data = (await req.json()) as DataForAI;

    const prompt = getMealPlanPrompt(data);

    // TODO: use a combination of the system prompt and the user's input to generate a response
    const aiResponse = await openai.chat.completions.create({
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: prompt,
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
