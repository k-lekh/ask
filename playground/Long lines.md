I'm ok with long lines of code like this
```js
const async_func_result = await clean(await async_func(ask, read, write, node_fetch, find, transpile, hash, log))
```

Just put arguments from most important to less important.
```
// source is more important than payload, so it comes first
routine(source, payload)
```