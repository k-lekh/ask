# Async by default
Ask language is async by default: there is no need to type 'async' and 'await' each time, because every function is async.
Transpiler adds all necessary syntax to convert ask language to valid javascript.

# Code style
In human code, I prefer clean and minimalistic style.
In generated code, I prefer more strict rules, such as adding ';' to the end of the executable line;

# Examples
##  Single Ask
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

## Parallel Asks
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

## Parallel functions
<input lang="ask">
  original_widget, original_description = 
    find(html_text, '[data-exchange-rate]')
    find(html_text, '[data-attrid="wa:/description"]')
</input>
<output lang="js">
  
</output>

## Global function call
<input lang="ask">
  contacts = read('https://domain.com/contacts')
  task_text = read('tasks/transpile.md')
</input>
<output lang="js">
  const contacts = await read('https://domain.com/contacts');
  const task_text = await read('tasks/transpile.md');
</output>
</input_example>

## Native JavaScript keeps unchanged
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

## Return
### Keep existing return source code
<input lang="ask">
  data = `count from 0 to 10`
  
  return data ?? ''
</input>
<input output="js">
  const data = await ask(`count from 0 to 10`);

  return data ?? '';
</input>

### Return last computed value
<input lang="ask">
  data = `count from 0 to 10`
</input>
<input output="js">
  const data = await ask(`count from 0 to 10`);

  return data;
</input>

### Return last anonymous computed value
<input lang="ask">
  `
    count from 0 to ${value}
  `
</input>
<input output="js">
  return await ask(`
    count from 0 to ${value}
  `);
</input>

## Async by default
<input lang="ask">
  console.log('Do you already love it or have it?')
</input>
<output lang="js">
  await console.log('Do you already love it or have it?');
</output>

## Call imported tasks
<input lang="ask">
  html = 'engine/html.ask' template_with_content
</input>
<output lang="js">
  html = 'engine/html.ask' template_with_content
</output>

## Specify model
<input lang="ask">
  html = o3-mini `
    Generate html
  `
</input>
<output lang="js">
  const html = ask(`
    Generate html
  `, { model: 'o3-mini' })
</output>
