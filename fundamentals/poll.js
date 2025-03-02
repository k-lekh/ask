/**
 * Reads a source line by line and ask(each line)
 * 
 * There is no need to cache poll(), because splitting a string is a trivial operation
 * And each ask is cached individually, what makes it granular and easy to change
 */
import { ask } from './ask.js'

let _poll = default_poll
async function default_poll(text, get_task_for_line) {
  if (typeof text === 'function') {
    _poll = text
    return ''
  } 
  
  return (await Promise.all(text.trim().split('\n').map((payload_line) => ask(get_task_for_line(payload_line)))).join('\n')).trim()
}

export const poll = _poll