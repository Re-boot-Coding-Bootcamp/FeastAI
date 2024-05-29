import OpenAI from "openai";
import { env } from "~/env";
import type { DataForAI } from "~/types";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function POST(req: Request) {
  try {
    const {
      tdee,
      caloriesForFitnessGoal,
      veganOrVegetarian,
      preferredProteinSources,
      preferredCarbSources,
      preferredFatSources,
    } = (await req.json()) as DataForAI;

    const aiResponse = await openai.chat.completions.create({
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content:
            "You are a Full Stack Web Development Coding Bootcamp Tutor, you help evaluate my code.",
        },
        // {
        //   role: "system",
        //   content: `Question: ${question}`,
        // },
      ],
      model: "gpt-4o",
      n: 1,
    });

    return new Response(JSON.stringify({ message: "Request received" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { POST };
