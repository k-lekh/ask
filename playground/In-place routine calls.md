To call such routine we must first evaluate cache time in ms.
<ask>
routine_text = read(source)
cache_time = `
  Convert provided time span description to a precise number of milliseconds.
  Reply only number.

  # Time span description
  ${payload}
`
return routine(routine_text, , { cache_time })
</ask>

# Transpilation examples
## Embedding routine result
<ask>
topics = o1`
  # Task
  return newest topics from this page:

  # Page
  ${routines/fetch_newest_topics.ask, keep for 4:20 then don't care}
`
</ask>
<js>
  # Task
  return newest topics from this page:

  # Page
  ${routines/fetch_newest_topics.ask, cache 10 minutes}
</js>

## 