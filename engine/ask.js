import dotenv from 'dotenv'
dotenv.config()

const default_model = 'o3-mini-2025-01-31'

import OpenAI from "openai"
const rules = `
  Be concise. Do not repeat question. Do not repeat input data.
  If task comes with state, then use this state to satisfy the request.
  If state is provided, then you need to evaluate a next state and use it for output.
  Don't ask for more details, it's a one-shot conversation.
  If you asked a yes/no question, then reply only YES or NO, and nothing else.
  If your answer is NO, no, No, nO — then reply with empty string, and never reply with empty string in other cases.
`.trim()
const openai = new OpenAI()

import path from 'path'
import fs from 'fs'
import md5 from 'md5'
import chalk from 'chalk'
import { log } from './log.js'

['./cache'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir))
  }  
})

let _ask = default_ask
async function default_ask(arg1, input_payload, {
  model = default_model,
} = {}) {
  if (arg1 === '') {
    return ''
  }

  if (typeof arg1 === 'function') {
    _ask = arg1
    return;
  }

  let input_task = arg1 ?? ''
  if (input_payload) {
    input_task = input_task + '\n\n# Payload:\n' + input_payload
  }
  const started = Date.now()

  let task_intent = input_task.trim().substring(0, 100) + "...";
  const cache_key = md5(input_task);
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
      model,
      messages: [{
        role: "user", 
        content: `
# Rules
<rules>
${rules}
</rules>



${input_task}
        `.trim(),
      }]
  });
  const text_result = completion?.choices?.map(choice => choice?.message?.content).filter(Boolean).join('\n\n')
  fs.writeFileSync(cache_path, text_result)
  log(chalk.cyan('Cached'), log_id);

  log(`Done in ${Date.now() - started} ms, used ${JSON.stringify(completion?.usage ?? {}, null, 2)}`, log_id)

  return text_result
}

export async function ask(...args) {
  return await _ask(...args);
}