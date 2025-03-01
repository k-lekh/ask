# Key ideas
Ask language is based on `javascript`, and any valid `javascript` is valid in `ask`.
It does not guarantee though that instructions will run successfully.

# ask(ask)
Initially, ask is a call to of a default runner.
Ask function can redefine self. To do is, pass a new ask function as an argument to the original ask function.
```js
import { ask_openai } from '../ask_providers.js'
await ask(payload => ask_openai(payload, 'o1-mini'))
```

# Async by default
Every function is `async`, every function calls with `await`.
There is no need to write these words, save tokens.
Any `javascript` is valid in `ask`, and transpilation makes every defined function `async`, every function call makes with `await`.
This is the rule. Every function is async. 
Accept this idea and enjoy full power of async world with reduces headache and mental load.

# Coffee Script
Yes, it's like CoffeeScript was for developers, who needed better JavaScript, because their tasks were at a higher level, in the hierarcy of levels of abstraction.
Same here, we need new JavaScript. 

# New JavaScript is simpler
We need new JavaScript.
It evolved significantly, and it keeps goind
Which is amazing! More features, broader field of application, it gives so much power.
What else is a good idea to do, I think, is to evolve it in both directions: not only towards more complex specification, but also including simplified syntax for routine tasks like `routing data flows among ask-runners`.

# Ask runner

`ask(ask)` may redefine self.
Runn