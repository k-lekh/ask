document.querySelectorAll("ask")?.forEach(async node => {
  const routine_text = node.innerText
  console.info('Ask for routine', node)
  console.log(routine_text)

  const routine_result = await routine(routine_text)
  console.info('Routine result', node)
  console.log(routine_result)
})

// var inbox = [] // lifo
// const consumers_to_render = new Set()
// let render_last_run
// async function render() {
//   render_last_run = Date.now()
//   document.querySelectorAll("iframe")?.forEach(c => consumers_to_render.add(c))
  
//   console.log('Ask consumers to render', consumers_to_render)
//   consumers_to_render.forEach(node => {
//     const src = node.getAttribute('src').split('?')[0]
//     node.setAttribute('src', `${src}?${render_last_run}`)
//   })

//   console.info(`Render done in ${Date.now() - render_last_run} ms`)
// }

// async function manager_cycle() {
//   const top = inbox.pop() || ''
//   if (top) {
//     const new_routine = await routine(top)
//     if (new_routine) {
//       console.info(`// it's bit urgent, innit?`)
//       console.log(new_routine)
//       inbox.push(new_routine)
//       return new_routine
//     }
//   }
//   return ''
// }

// const pause = 4200
// let timeout
// let first_run
// let last_run
// let fps = 0
// let cycles = 0
// const run_manager_loop = async () => {
//   cycles = cycles + 1
//   console.info(`Manager cycle ${cycles} start`)
//   first_run = first_run ?? Date.now()
//   last_run = Date.now()
//   const manager_cycle_result = await manager_cycle()
//   console.info(`Manager cycle ${cycles} result`)
//   console.log(manager_cycle_result)

//   console.info(`Render cycle ${cycles} start`)
//   const render_result = await render()
//   console.info(`Render cycle ${cycles} result`)
//   console.log(render_result)

//   const now = Date.now()
//   const duration = now - last_run
//   const next_run = Math.max(0, pause - duration)
//   const fps = cycles / (duration / 1000)
//   const fpm = fps * 60
//   console.info(`Manager cycle ${cycles} done, next run in ${next_run} ms`, { fpm, fps, cycles, duration })
  
//   timeout = setTimeout(run_manager_loop, next_run)
// }

// (async () => {
//   document.querySelectorAll("ask")?.forEach(async node => {
//     console.info('Ask for routine', node)
//     const routine_text = node.innerText
//     console.log(routine_text)

//     const routine_result = await routine(routine_text)
//     console.info('Routine result')
//     console.log(routine_result)
//   })

//   await run_manager_loop()
// })()