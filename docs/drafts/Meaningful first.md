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