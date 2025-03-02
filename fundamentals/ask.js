import path from 'path'
import fs from 'fs'
import md5 from 'md5'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { log } from './log.js'
import { hash } from './hash.js'

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

;['./cache', './cache/ask'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir))
  }  
})

const default_reply = `
  Hello, I'm the first Ask instance.
  Ask anything to start communication.

  # I have the following fundamentals
  routine,
  find,
  read,
  poll,
  write,
  append,
  prepend,
  log,
  hash,
  clean,
  transpile.

  # Pricing
  Currently I spend money of my author.
`

let _ask = default_ask
async function default_ask(task, payload, { model = default_model } = {}) {
  if (task === '') {
    if (payload) {
      return payload
    }
    return default_reply
  }

  if (typeof task === 'function') {
    _ask = task
    return ''
  }

  const task_with_payload = (payload ? `${task}\n\n# Payload:\n${payload}` : task).trim()
  const started = Date.now()
  const id = hash(task_with_payload);
  const log_id = `${id} Ask`;
  log(chalk.cyan(task_with_payload), log_id)

  const cache_path = path.resolve(`./cache/ask/${id}.${model}`);  
  if (fs.existsSync(cache_path)) {
    const cache_text = fs.readFileSync(cache_path, 'utf8');
    if (cache_text) {
      log(chalk.cyan(`Cache read ${cache_key}`), log_id);
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
  log(chalk.cyan(`Cache write ${cache_key}`), log_id);

  const { prompt_tokens, completion_tokens, total_tokens, completion_tokens_details: { reasoning_tokens } } = completion?.usage
  const stats = Object.entries({ prompt_tokens, completion_tokens, total_tokens, reasoning_tokens }).map(entry => entry.join('=')).join(', ')
  log(`Done in ${Date.now() - started} ms, used ${stats}`, log_id)

  return text_result
}

export const ask = _ask