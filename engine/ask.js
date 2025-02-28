import dotenv from 'dotenv'
dotenv.config()

import OpenAI from "openai"
const rules = `
  Be concise. Do not repeat question. Do not repeat input data.
  If task comes with state, then use this state to satisfy the request.
  If state is provided, then you need to evaluate a next state and use it for output.
  Don't ask for more details, it's a one-shot conversation.
  If you asked a yes/no question, then reply only YES or NO, and nothing else.
`.trim()
const openai = new OpenAI()

import path from 'path'
import fs from 'fs'
import md5 from 'md5'
import chalk from 'chalk'
import { log } from './log.js'

['./cache'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }  
})

export async function ask(input_task = '', intent = '') {
  const started = Date.now()
  const task = Array.isArray(input_task) && subs.length === 0 ? input_task[0] : String(input_task)
  if (!task) {
    return 'Error: no input task'
  }

  let task_intent = input_task.trim().substring(0, 100) + "...";
  const cache_key = md5(task);
  const log_id = `${cache_key}  Ask`;
  const cache_path = path.resolve(`./cache/${cache_key}`);
  log(chalk.bgCyan(task_intent), log_id)
  
  if (fs.existsSync(cache_path)) {
    const cache_text = fs.readFileSync(cache_path, 'utf8');
    if (cache_text) {
      log(chalk.cyan(`Answered from cache ${cache_key}`), log_id);
      return cache_text;
    }
  }

  const completion = await openai.chat.completions.create({
      model: "o1-mini",
      messages: [{
        role: "user", 
        content: `
          # Rules
          ${rules}
          

          ${task}
        `.trim(),
      }]
  });
  const text_result = completion?.choices?.map(choice => choice?.message?.content).filter(Boolean).join('\n\n')
  fs.writeFileSync(cache_path, text_result)
  log(chalk.cyan('Cached'), log_id);

  log(`Done in ${Date.now() - started} ms, used ${JSON.stringify(completion?.usage ?? {}, null, 2)}`, log_id)

  return text_result
}