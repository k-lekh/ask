const files = await read('fundamentals/*.js')

/**
 * Simpler language syntax opens more space for developer to name variables and functions.
 * Since this is a usage of Natural Language, the Ask framework encourages it.
 */
const empty_files = await files.split('\n').map(async file_path => {
  const file_content = await read(file_path)
}).join('\n').trim()

// append todo list with these files, if they are not there yes
// review the order and priority