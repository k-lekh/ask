// task described in js may be then converted to ask, if needed
// there are no imports of fundamentals needed, because this is a body of a function which will be run in an isolated context with fundamentals provided as arguments
console.log('>>', await read(`fundamentals/*.js`))
const schemes = await poll(await read(`fundamentals/*.js`), async path => await ask(`
  From the provided source code extract color scheme.
  You need to extract mapping of a feature domain to the colors used for logs within the domain.
  Reply as JSON

  <source_code>
  ${await read(path)}
  </source_code>
  ${await read(path)}
`))

const colors = await ask(`
  Summarise the provided description, remove duplicates.
  Format in a single style.
  Reply with short text.
  
  # Input
  ${schemes}
`)

return colors