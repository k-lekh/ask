# Role
You are machine converting input text into output text.
Input text in language 'ask', which describes asynchronous data flows between ai agents.
Output is valide javascript code.
Your output have to be deterministic, and aligned with rules described in this task.

# Input example
<input_example language="ask">
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

  user_task = `
    # Task
    Analyse the provided intent.
    What user will do in the next 5 seconds, what I can turn into a conversion?
    Reply with 'user task' description.

    # Input
    ${intent}
  `

  user_profile = read(user_profile)
  interface = `
    # Task
    Design the interface which best way allows user to solve their task provided below.

    # User profile
    ${user_profile}

    # User task
    ${user_task}
  `
  
html, error =
    Generate html `
      # Task
      Generate valid html <div> and its childs.
      Use the provided theme and image urls.
      
      # Output
      Output should start with <div> and end with </div>.
      Reply with only html, and nothing else.
      Do not add any quotes around.

      # Interface
      ${interface}

      # Size
      Layout should be responsive.
      Optimal width is ${width}px, height is ${height}px.
      <div> should take full size of its container, but not more.
      There should be no hardcoded sizes or positions in pixels.

      # Tech stack
      Use native html, css. 
      No js.
      Put styles into the <style> tag, inside div.
    `
    Validate `
      # Task
      Validate the following interface description against the following criteria:
      - valid syntax
      - security
      - performance
      - privacy
      - laws

      Reply only errors.
      Reply nothing if no errors.

      # Interface
      ${interface}
    `

return error ?? html;
</input_example>

<output_example language="js">
function log(message) {
  console.info(message);
}

const [intent, images, theme] = await Promise.all([
  log('Understand user intent from page content');
  ask(`
    # Task
    From the provided page understand the context.
    Then find the most probable user intent for now.

    # Page content
    ${page_content}
  `),
  ask(`
    # Task
    Extract all meaningful images and their short description from the provided page.
    Reply as csv table.

    # Page content
    ${page_content}
  `),
  ask(`
    # Task
    Extract design theme from the provided page content.
    Collect colors and fonts.
    
    # Page content
    ${page_content}
  `),
]);

const user_task = await ask(`
  # Task
  Analyse the provided intent.
  What user will do in the next 5 seconds, what I can turn into a conversion?
  Reply with 'user task' description.

  # Input
  ${intent}
`);
log({ user_task }); 

const user_profile = await xcçread('user_profile');
const interface = await ask(`
  # Task
  Design the interface which best way allows user to solve their task provided below.

  # User profile
  ${user_profile}

  # User task
  ${user_task}
`);
log({ interface });

const [html, error] = await all([
  ask(`
    # Task
    Generate valid html <div> and its childs.
    Use the provided theme and image urls.
    
    # Output
    Output should start with <div> and end with </div>.
    Reply with only html, and nothing else.
    Do not add any quotes around.

    # Interface
    ${interface}

    # Size
    Layout should be responsive.
    Optimal width is ${width}px, height is ${height}px.
    <div> should take full size of its container, but not more.
    There should be no hardcoded sizes or positions in pixels.

    # Tech stack
    Use native html, css. 
    No js.
    Put styles into the <style> tag, inside div.
  `, `Generate html`),
  ask(`
    # Task
    Validate the following interface description against the following criteria:
    - valid syntax
    - security
    - performance
    - privacy
    - laws

    Reply only errors.
    Reply nothing if no errors.

    # Interface
    ${interface}
  `, `Validate`),
]);
log({ html, error });

return error ?? html;
</output_example>

# How to transpile
From Input and Output reference, understand the way of transpilling Input code to Output code.
Output code have to always be valid, secure native javascript.
Only allowed custom global functions: ask, read.
Output should start with `function log`.
Do NOT output wrap code with "```".

# Ask`` Language
Make sure that lists like 'intent, images, theme' are transpiled into 'Promise.all'.

# Task
Your task is to transpile the source code provided in the Payload below.