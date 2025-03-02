// task described in js may be then converted to ask, if needed
// there are no imports of fundamentals needed, because this is a body of a function which will be run in an isolated context with fundamentals provided as arguments
const schemes = poll(await read(`fundamentals/*.js`), async path => ask(`
  From the provided source code extract color scheme.
  You need to extract mapping of a feature domain to the colors used for logs within the domain.
  Reply as JSON

  <source_code>
  ${await read(path)}
  </source_code>
  ${read(path)}
`))

const colors = await ask(``)