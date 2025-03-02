// ".html.ask" in this case means that running this file as an Ask routine, it will produce html output, so the caller may have a bit more info just from the name, which is fast and cheap
// ".ask.js" means that file contains Ask script transpiled to Javascript.
/**
 * I also introduce simplified syntax
 * No fucking camelWhatTheFuckIsThis(iHateIt: makes_no_sense)
 * Just use damn English!
 * If you have issues with saces, then use under_score.
 * Just use that your computer already give you.
 * You know that Browsers replace spaces with "%20", ok - keep in mind.
 * You know that some terminals need a value with spaces to be wrapper with '' - keep in mind.
 * But use as natural language as you can.
 */
/**
 * The mission of Ask is to use as natural language as possible to operate routines.
 */
/**
 * ask() and read() probably two minimal set of fundamentals
 * because I need to know when to run and when to read js files.
 */
/**
 * I utilize fundamentals to write temporary results to the destinations,
 * And then I return from routine not the whole response, but the path to the artifact.
 * Then, I can put into this artifact an index file of a huge database of artifacts.
 * And my routines may use them.
 * They just got empty string in case of error, which is a special value for human, but not for the machine, so on HTTPS level we are still working with text, all valid by design.
 * So empty string is a special and trivial thing at the same time. 
 * Beautiful.
 */
/**
 * TODO
 * routine to ask for a summary of what I see beautiful in ask, extracted from comments.
 */
const js_path = 'fundamentals/extract_comments_from_one_file.md.ask.js'
const js_content = await read(js_path)

const js_comments = await ask(`
  # Goal
  Your goal is to extract comments from the provided JavaScript code to the multiline text, where each line is a comment.

  # Input
  ${js_content}
`)

console.log('>> js_comments', js_comments)

/**
 * You can get so much information from the file name!
 * And in modern tech, file names are really long.
 */
/**
 * TODO
 * Create a 
 */
return await write(js_comments, 'fundamentals/extract_comments_from_code_to_docs.js_comments.md')