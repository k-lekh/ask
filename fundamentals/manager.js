import chalk from 'chalk'
import { ask } from './ask.js'
import { read } from './read.js'
import { write } from './write.js'
import { routine } from './routine.js'

/**
 * Syntax.
 * I try to use only quotes `
 * 
 * Not because they looks certain way, just because they have more freedom, they may be used in every case when I need a string, without thinking which ' or " there I need. Stupid!
 * Stupid question!!
 * Use those which can do more and includes others abilities. Easy. Isn't it obvious?
 */
/**
 * TODO use factory
 */
/**
 * Descriptor to the file relative path, so its human readable, easy extendable, replacable, patchable, there is a lot freedom.
 * Ask encourages freedom.
 * **Ask discourages any form of harm.**
 */

const run_id = Date.now()
let iteration = 0
let _manager = default_manager
async function default_manager(payload) {
  const inbox = await read(`inbox/**.ask.js`)
  console.log(chalk.green(inbox))

  inbox.split('\n').forEach(async routine_file => {
    console.log(chalk.cyan(`${run_id} ${iteration} Manager runs routine from ${routine_file} with payload ${payload}`))
    const reply = await routine(routine_file)
    write(reply, `${routine_file}.${run_id}.${iteration}.reply`)
  })

  console.log(chalk.cyan(`${run_id} ${iteration} Manager done`))
}

export const manager = _manager