/**
 * I dont'have to import my fundamentals on every page, because I import them in a routine runner.
 * Then I just use them in my routine code even in pure js, and it's valid for execition!
 * This is beautiful.
 * No fucking linting errors when commiting or pushing.
 * No fucking imports. I have them.
 * Just explain your intent with your code!
 * You start with default fundamentals which I made, and you add new fundamentals making concious decision.
 */
/**
 * The beauty of Ask is that writing Ask code is faster than describing in detail understandable for another human text.
 */
const base = 'playground/theme'

const html_source = await read(`https://www.markdownguide.org/basic-syntax/`)
const q = await cheerio.load(html_source)

const css_url = await read(`${base}.css_url`) || await ask(`
  In the provided html, find the css file url which contains the main theme colors.
  Reply this file url only, and nothing else.
  
  # html
  ${q('head')}
`)
await write(css_url, `${base}.ask.css_url`)

/**
 * In-place cache
 * Good for manual control and debugging: you see all produced files right in place alongside with the file you are debugging.
 * It's very good developer experience.
 */
/**
 * TODO move read() || await to the ask() default features
 */
/**
 * Reuse artifacts from other jobs
 * This is my playground.
 */
const theme = await read(`${base}.theme`) || await ask(`
    From the provided CSS text extract the design system variables.
    Make with design system ready for integration.
    Reply with valid CSS code.

    [parse_css]
    ${await read(`https://www.markdownguide.org${css_url}`)}
    [/parse_css]
`)
await write(theme, `${base}.ask.css`)

/**
 * So I just edit my knowledge base here and there
 * And Ask Manager rebuilds my artifacts in background
 */
const html = await read(`${base}.html`) || await ask(`
  Display the provided design system in a small widget.
  Apply design system to the generated html.
  Add new examples.
  Make responsive compact page.
  Reply with valid HTML page.

  [design_system]
  ${theme}
  [/design_system]
`).then(x => ask(`
  Optimise provided html page for small widget size.
  Max size is 300px width, 150px height.
  Widget should be smaller than max size, and be responsive to always fill all page with no scroll.
  
  [HTML]
  ${x}
  [/HTML]
`))
await write(html, `${base}.ask.html`)
