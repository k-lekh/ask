import { read } from './read.js'
import { ask } from './ask.js'

/**
 * Transpiles argument written in Ask-language to a javascript code.
 * This code may be used to create a run-time anonymous async function.
 * Then instant async call of this function retreives a result of executing instructions described in the original payload in Ask-language.
 */
export const transpile = async (ask_text) => {
  const rules = await ask(`
    # Role
    You are code analyser.
    Use provided Language definition to extract transpilation rules for the provided language.
    Rules should be clear enough to follow them exactly while transpiling.
    Reply in XML or JSON format.
    DO NOT use Markdown.

    # Language definition
    ${await read('engine/ask-language.md')}
  `)

  const js = await ask(`
    # Role
    You are transpiler converting input text into output text.
    Input text is provided in language 'ask'.
    Output should be valid javascript code.
    Follow rules described in this task.
    Use provided Language definition to extract transpilation rules and apply them

    # Transpiling process
    ${rules}

    # Rules
    Output code have to always be valid, secure native javascript.
    Only allowed custom global functions: ask, read, write, log.
    Do NOT output wrap code with "\`\`\`".

    # Ask Language
    Make sure that lists like 'intent, images, theme' are transpiled into 'Promise.all'.

    # Task
    Your task is to transpile the source code provided in the Payload below.

    # Code to transpile
    ${ask_text}
  `);

  return js;
}