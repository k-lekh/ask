document.querySelectorAll("ask")?.forEach(async node => {
  const routine_text = node.innerText
  console.info('Ask for routine', node)
  console.log(routine_text)

  const routine_result = await routine(routine_text)
  console.info('Routine result', node)
  console.log(routine_result)
})
