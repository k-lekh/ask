import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";
const rules = `
  Be concise. Do not repeat question. Do not repeat input data.
  If task comes with state, then use this state to satisfy the request.
  If state is provided, then you need to evaluate a next state and use it for output.
  Don't ask for more details, it's a one-shot conversation.
  If you asked a yes/no question, then reply only YES or NO, and nothing else.
`.trim();
const openai = new OpenAI();

export async function ask(input_task, ...subs) {
  const task = Array.isArray(input_task) && subs.length === 0 ? input_task[0] : String(input_task)
  const completion = await openai.chat.completions.create({
      model: "o1-mini",
      messages: [{
        role: "user", 
        content: `
          # Rules
          ${rules}
          
          # Task
          ${task}
        `.trim(),
      }]
  });
  
  return completion?.choices?.map(choice => choice?.message?.content).filter(Boolean).join('\n\n');
}