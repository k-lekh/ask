import dotenv from 'dotenv'
import chalk from 'chalk'
import { hash } from './hash.js'
import { write } from './write.js' 
import { cache } from './cache.js'
import '../console/colors.js'

dotenv.config()
const default_model = 'o3-mini-2025-01-31'

const getModel = (guess) =>{
  return {
    default_model,
    'o3': 'o3-mini-2025-01-31',
  }[guess] ?? guess
}

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
async function default_ask(_task, payload = '', { model = default_model } = {}) {
  if (typeof _task === 'function') {
    _ask = _task
    return ''
  }
  
  const task = _task?.trim?.() || '' // todo use in clean
  // TODO: zero point, all requests starts here and then routed to other fundamentals

  if (!task) {
    return await ask(`
      Generate a prompt for OpenAI model to make it do its best to perform the following task with the following payload.

      [payload]
      ${payload}
      [/payload]

      [${_task}]
    `)
  }

  const task_with_payload = (payload ? task + '\n' + String(payload) : task).trim()
  
  const started = Date.now()
  const id = await hash(task_with_payload); 

  const cache_path = `cache/ask/${id}.${getModel(model)}`  
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
  const stats = Object.entries({ total_tokens, reasoning_tokens, prompt_tokens, completion_tokens }).map(entry => entry.join('=')).join(', ')
  console.log(chalk.magenta(`Ask done in ${Date.now() - started} ms`))
  console.log(chalk.magenta(stats))
  await write(stats, `logs/ask.${id}.usage`)

  return text_result
}

export const ask = _ask