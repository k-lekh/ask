We had OS API, which is veeery strict, does not matter if it is Chrome, macOS or Linux.
So we created tooling for it: languages, transpilers, compilators, test frameworks, ui frameworks.

Now we have AI. We know it's powerful. We know it's capable. 
But how do we program such brains in a predictable way?
Just `ask`.

Seriously, with this framework, you just ask what you need and run these instructions on ai executors, chained or in parallel.

Let's be honest, we don't write programs as we did before.
Spending a week on the best sorting algoritm ever is now stupid rather than innovative.
We are already on another level of abstraction.

We have access to a more complex, smart, expensive, creative api.
It's different from OS APIs. And we need different tools.

Let's start from the basics - language.
How do you command a machine? 
`Ask` is a superset on top of `JavaScript`, which means any `js` code is valid in `ask`.

`ask()` is a fundamental function, a question to runner. 
`ask(ask)` sets new fundamental.

Runner is a lambda-function which takes payload and replys with an answer.
Fundamental runner is `ask` - just a question to ai.

Everything is done with ai in `ask`.
Even transpiling `ask` to `js` is ai-based.
Transpiling is a process of running chains of `ask` calls, from reaing documentation and understanding the transpilation principles from examples, to validating the resulting `js` code.

Everything may be asked in `ask`.

There are also fundamental functions like `read`, `write`, `find`, `transpile`, etc.

Actually, there is no requirement that `ask` or any other fundamental have to use ai.
It only have to be `async`.
It may be easily replaced via `ask(ask)`.

Well, we writing async instructions for task runners and data flows.
It's ok to write them in nodejs, because 'slow' node is not the slowest part in this system.
When it will become a problem, we will use `ask` platform to rewrite self to run on another environment.

Yes, the instance may evolve and rewrite itself.
Result of a task may be task, and task may have `write` call, which overwrites existing `.ask` files.
Transpiler will not find cache for this file, because it's content changed, so the md5 result too.
Then transpiler task will make several `ask` calls to solve the task, and solution will be cached.

After each run, result is cached, so **solving tasks gains knowledge**.

SOLVING TASKS GAINS KNOWLEDGE

Cache gathers naturally. Cache invalidates by design. I need only scheduled cleanup of unused cache files.

Cache is my app. Removing one file from cache means solving the task again, or waiting for `ask` reply again, or `read`, etc.
So, no cache - rebuild. If there were any dependent of a task instructions, they will change too, because they are all just text. I changed example - changed knowledge base - changed transpiler script - changed generated js - changed solution of a final task.

**Final task** is what was evauated the last in the `.ask` file.

Rest API is not needed, when you can do this
```ask
user_location = ask`
  # Task
  Extract user location from the provided html

  # HTML
  ${read('https://www.instagram.com/k__lekh/')}
`
```

# Syntax concept
Minimalism.
If in JS ';' are not required, we don't use them.
In Ask, we simplify even more: one separator is enough.
We don't write like this
```ask
  read('task.ask')
```

Opening `('` is too much, just `(` is enough.
Closing `')` is too much, just `)` is enough.
I choose omit quotes rather than brakets, because symbol type 'quote' (another) is already used, and they are small, and visually not that different.
So, in Ask you may write
```ask
  read(task.ask)
```

Which transpiles to
```js
  return await read('task.ask');
```

# Extendability
<mark>TODO</mark> make runners in args extendable with plugins from npm (create a npm package template project, `create-ask-effect`).

```js
  import effect from 'my/effect'

  // replace default ask implementation
  ask(effect)

  // restore original implementation

```
May be changes via ask(ask) approach
  // Arguments are **routines** - small programs which may be recalled by their name
  const async_func = new AsyncFunction('ask', 'read', 'write', 'fetch', 'find', js_clean)

# Slow down?
Async interfaces for some time become new standard.
Soon local models become faster, smarter, smaller, and hardware acceleration become sufficient.
Also, we will learn to precompile routine-runners.

## Pretrainer routine-runner
It's a very specific `ask` for the very specific tasks, with specific knowledges required.
This means, once we get more or less stable cache for a routine, we may determine which aspects of model are not required for this task and remove them, meking a huge fundamental model smaller but still efficient for certain tasks.
Then we deploy these reduced models as lambdas and p2p and local runners.
Compiled to wasm, cached to memory.

## Routines marketplace
Blockchain?
Nobody gets source code of routine, because its enclosed inside Smart Contract.
Smart contract provide fundamentals so it can run ask-code.

**Smart contract may run ask-code**