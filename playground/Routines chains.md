Routines may be chained like this
```ask
  return routine(a) > routine(b) > routine(c) > `
    Render as html

    ${payload}
  `
```

And ${payload} is available globally, and provided from the previous call in a chain.