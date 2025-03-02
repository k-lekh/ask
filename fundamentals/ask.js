import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import { log } from './log.js'
import { hash } from './hash.js'
import { write } from './write.js' 
import { cache } from './cache.js'

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

  const task_with_payload = (payload ? task + '\n' + payload : task).trim()
  const started = Date.now()
  const id = await hash(task_with_payload);
  const log_id = `${id} Ask`;

  const cache_path = `cache/ask/${id}.${model}`  
  const cache_text = await cache(cache_path)
  if (cache_text) {
    return cache_text
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



${task_with_payload}
        `.trim(),
      }]
  });
  const text_result = completion?.choices?.map(choice => choice?.message?.content).filter(Boolean).join('\n\n')
  await write(text_result, cache_path)

  const { prompt_tokens, completion_tokens, total_tokens, completion_tokens_details: { reasoning_tokens } } = completion?.usage
  const stats = Object.entries({ prompt_tokens, completion_tokens, total_tokens, reasoning_tokens }).map(entry => entry.join('=')).join(', ')
  await log(`Done in ${Date.now() - started} ms, used ${stats}`, log_id)

  return text_result
}

export const ask = _ask