Filename: fundamentals/check_await.ask.md

Invalid special function calls detected:

-- Context for first invalid call --
(No preceding line)
fundamentals = read(fundamentals/*.js) 
(Empty line after)

-- Context for second invalid call --
(Empty line before)
md = read(fundamentals/*.js) poll`
  # Task
(Next line after)

-- Context for third invalid call --
(Line before: ending of template literal containing "${read(payload)}")
write(md, fundamentals/check_await.ask.md)
(Line after)
[object Object]