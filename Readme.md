# Ask language
<mark>>ask``</mark>
### A new language for getting job done with AI.

## We do not write code anymore, don't we?
### We control data flow
Oldschool programming was meant to implement algorithms and route data flows.
Now, AI can handle routine tasks, so there is no need to spend two days making best ever possible search algoritm.
It is used as an `ask`, and it will be lazy evaluated if it will be needed.
This is obviously slow. But sometimes speed is not what we need.
In this case, slow rebuild happens using ask-ai directives, rather that writing all necessary implementation.
It will be implemented (and properly cached) according to the best practices in the indusctry right now, accorging to recent security news, design trends, etc.
There is no need in backward compatibility, in protocols and formats.
Your task is a text, your html is a text.
You free your mental capacity.
From the level of micro operatins like 'if this then that' etc, we zoom out to stars and start operating concepts.
With `Ask` you build your interface with ideas and data routing.
The rest is for AI.
So your app is basically your tasks + state.
Frameworks, SDKs, APIs, this all is not needed.
Rest API is not needed, when you can do this
```ask
user_location = ask`
  # Task
  Extract user location from the provided html

  # HTML
  ${read('https://www.instagram.com/k__lekh/')}
`
```

# Caching, stabilised and self-evolving apps
Caching improves the speed of repeated requests.
Fixing a permanent cache file is also a way to make a response for a certain ask determined, equal every time.
For other tasks may be implemented a/b/c experiments.
Options for experiments, instructions in `ask`, may be created easily with `ask` itself.
This way, caching becomes a permanent storage of a desired behaviour.
Changing ask-file content changes its md5 hash, which automatically invalidate cache for transpillation, and as a result of all related texts.
Doing just regular scheduled cleanup should be enough in this case.
Asking to generate new tasks and overwrite them is a way to approach building self-evolving apps.