Meaningful information comes first in function definition.
Append is a good example:
```js
let _append = default_append
async function default_append(patch, destination) {
  if (typeof patch === 'function') {
    _append = patch
    return ''
  }

  return write(
    await(read(destination)) + '\n\n' + patch,
    destination
  )
}
```

Meaningful info is `patch`, and takes the first place.
What can be more meaningful?
The new `append function`, then it becomes a `patch`.
How beauty is this?

Another example is 
`async function default_find(what, where)`

What to find is more important, than where. There may be no 'where', then runner will try to find it somewhere else.
It will probably ask itself, where it can find it, and then will look there.
In terminal, when a task