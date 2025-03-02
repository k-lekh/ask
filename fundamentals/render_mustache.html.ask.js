const mustache = await read('render_mustache.ask.js.mustache')

/**
 * So routine is a js file containing a body of js function.
 * The function will be then created from this text.
 * Then executed in a sandbox with provided TRUSTED FUNDAMENTALS.
 */

const result_path = 'render_mustache.ask.js.html'
const result = await write(result, result_path)

return result_path