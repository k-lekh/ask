const routines = await read('playground/**.ask')
console.log('routines', routines)

const abilities = await routines.split('\n').map(async path => {
  const ability_text = await read(path)
  console.log('>> ability text')
  console.log(ability_text)
  const x = await ask(`
    What kind of tasks this routine solves? 
    Reply as "{ key = ${path}, value = ${ability_text} }"
  `);
return ''
  }.join('\n')