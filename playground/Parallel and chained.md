# Parallel syntax
Usually in parallel we run tasks same complexity because we expect then they will consume likeli the same time, and it makes sense to parallel them. 
Ask language encourage this approach.

<ask>
topics, template, user = o1`
  return newest topics from this page:

  ```
  ${routines/fetch_newest_topics.ask, cache 10 minutes}
  ```
`
</ask>
<js>
</js>