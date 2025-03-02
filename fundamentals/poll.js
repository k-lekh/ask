/**
 * Reads a source line by line and ask(each line)
 * 
 * There is no need to cache poll(), because splitting a string is a trivial operation
 * And each ask is cached individually, what makes it granular and easy to change
 */
import { ask } from './ask.js'

let _poll = default_poll
async function default_poll(payload = '') {
  if (typeof payload === 'function') {
    _poll = payload
    return ''
  } 
  
  return (await Promise.all(payload.split('\n').map(ask)).join('\n')).trim()
}

export const poll = _poll