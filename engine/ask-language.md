# Async by default
Ask language is async by default: there is no need to type 'async' and 'await' each time, because every function is async.
Transpiler adds all necessary syntax to convert ask language to valid javascript.

# Code style
In human code, I prefer clean and minimalistic style.
In generated code, I prefer more strict rules, such as adding ';' to the end of the executable line;

# Examples
## Example: Single Ask
<input lang="ask">
    intent = "Regular text constant"
    user_task = `
      # Task
      Analyse the provided intent.
      What user will do in the next 5 seconds, what I can turn into a conversion?
      Reply with 'user task' description.

      # Input
      ${intent}
    `
</input>
<output lang="js">
    const intent = "Regular text constant";
    const user_task = await ask(`
      # Task
      Analyse the provided intent.
      What user will do in the next 5 seconds, what I can turn into a conversion?
      Reply with 'user task' description.

      # Input
      ${intent}
    `);
</output>

## Example: Parallel Asks
<input lang="ask">
  intent, images, theme = 
    Understand user intent from page content `
      # Task
      From the provided page understand the context.
      Then find the most probable user intent for now.
  
      # Page content
      ${page_content}
    ``
      # Task
      Extract all meaningful images and their short description from the provided page.
      Reply as csv table.

      # Page content
      ${page_content}
    ``
      # Task
      Extract design theme from the provided page content.
      Collect colors and fonts.
      
      # Page content
      ${page_content}
    `
</input>
<output lang="js">
  const [intent, images, theme] = await Promise.all([ 
    ask(`
      # Task
      From the provided page understand the context.
      Then find the most probable user intent for now.
  
      # Page content
      ${page_content}
    `), ask(`
      # Task
      Extract all meaningful images and their short description from the provided page.
      Reply as csv table.

      # Page content
      ${page_content}
    `), ask(`
      # Task
      Extract design theme from the provided page content.
      Collect colors and fonts.
      
      # Page content
      ${page_content}
    `)
  ]);
</output>

## Example: Global function call
<input lang="ask">
  contacts = read('https://domain.com/contacts')
  task_text = read('tasks/transpile.md')
</input>
<output lang="js">
  const contacts = await read('https://domain.com/contacts');
  const task_text = await read('tasks/transpile.md');
</output>
</input_example>

## Example: Native JavaScript keeps unchanged
<input lang="ask">
  if (error) {
    alert(error)
  }

  return error ?? html
</input>
<output lang="js">
  if (error) {
    alert(error);
  }

  return error ?? html;
</output>
</input_example>

## Examples return value
### Keep existing return code
<input lang="ask">
  data = `count from 0 to 10`
  
  return data ?? ''
</input>
<input output="js">
  const data = await ask(`count from 0 to 10`);

  return data ?? '';
</input>

### Return last evaluated value
<input lang="ask">
  data = `count from 0 to 10`
</input>
<input output="js">
  const data = await ask(`count from 0 to 10`);

  return data;
</input>

### Return last anonumous evaluated value
<input lang="ask">
  `
    count from 0 to 10
  `
</input>
<input output="js">
  const _tmp_ = await ask(`count from 0 to 10`);

  return _tmp_;
</input>