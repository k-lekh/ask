function info(...args) {
  console.log(`'%c${args.join('\n')}`, 'background-color: #2d2d2d; color: #00d2ff; text-shadow: 0px 0px 8px rgb(109 31 255);');
}

function log(...args) {
  console.log(`'%c${args.join('\n')}`, 'background-color: #2d2d2d; color: #eeeeee; text-shadow: 0px 0px 8px rgb(109 31 255);');
}

const fundamentals = {
  info,
  log,
  read: network,
  write,
  routine,
  trim,
  selector,
}
console.info(`Fundamentals: ${Object.keys(fundamentals).join(', ')}`)

async function selector(source, query) {
  const doc = typeof source === 'string' 
    ? new DOMParser().parseFromString(source, "text/html") 
    : source
  return doc.querySelectorAll(query)
}

async function write(source, payload) {
  if (source.startsWith('https://')) {
    return network(source, payload)
  }

  if (source.startsWith('inbox/')) {
    inbox.push({ source, payload })
  }
}

async function network(source, payload) {
  return await fetch(source, {
    method: payload === undefined ? 'GET' : 'POST',
    body: payload
  }).then(r => r.text())
}

async function routine(source, payload) {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const async_func = new AsyncFunction(...Object.keys(fundamentals), source)
  console.info('Routine start', source)
  console.log(payload)
  const func_result = await async_func(...Object.values(fundamentals), payload)
  console.info('Routine result')
  console.info(func_result)
}

async function trim(source = '') {
  return source.trim()
}