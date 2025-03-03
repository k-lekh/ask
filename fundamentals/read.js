import node_fetch from 'node-fetch'
import fg from 'fast-glob'
import chalk from 'chalk'
import { promises as fsp } from 'fs'

export async function read(source = '') {
  if (source.toLowerCase().startsWith('https://')) {
    return node_fetch(source).then(r => r.text());
  }

  if (source.toLocaleLowerCase() === 'date') {
    return Date.now().toString();
  }

  const files = await fg(source); 
  if (files.length === 0) {
    console.log(chalk.gray('read nothing', source))
  } else if (files.length > 1 || source.includes('*')) {
    return files.join('\n')
  }

  const [file_path] = files
  if (!file_path) {
    return ''
  }
  
  return await fsp.readFile(file_path, 'utf8');
}