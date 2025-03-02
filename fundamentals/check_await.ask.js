const fundamentals = await read('fundamentals/*.js')
await write(fundamentals, 'fundamentals/list.txt')

const examples = `
  ## 1
  <valid>
    const data = await read('docs/index.md)
  </valid>
  <invalid>
    const data = read('docs/index.md)
  </invalid>

  ## 2
  <valid>
    text above
    \${await ask('count from 1 to 100')}
    text below
  </valid>
  <invalid>
  <valid>
    text above
    \${ask('count from 1 to 100')}
    text below
  </valid>
  </invalid>
`

const errors = await poll(fundamentals, async path => {
  const calls = await ask(`
    # Task
    You are provided with a list of "special" functions.
    From the provided JavaScript code extract calls of "special" functions.
    Ignore Promise errors. Check only syntax.
    Reply in format: "file name\nfunction call"

    # Special functions
    ${fundamentals}

    # Examples
    ${examples}

    # File name
    ${path}

    # Source code
    <input>
    ${await read(path)}
    </input>
  `)
  const invalid_calls = await ask(`
    # Goal
    You are provided with a list of "special" functions.
    You are provided with a code fragment with "special" function usage examples.
    You need to find only sync calls, without word "async" before "special" function name.
    If you find them, reply with them.
    If not, reply 'ok'.

    # Source
    ${calls}
  `)

  return invalid_calls
})

await write(errors, 'fundamentals/check_await.ask.md')
return errors