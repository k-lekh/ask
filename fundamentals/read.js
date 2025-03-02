import node_fetch from 'node-fetch'
import fg from 'fast-glob'
import { promises as fsp } from 'fs'

export async function read(resource = '') {
  if (resource.toLowerCase().startsWith('https://')) {
    return node_fetch(resource).then(r => r.text());
  }

  if (resource.toLocaleLowerCase() === 'date') {
    return Date.now().toString();
  }

  const files = await fg(resource); 
  if (files.length > 1) {
    console.log('>> return', files.join('\n'))
    return files.join('\n')
  }

  const [file_path] = files
  if (!file_path) {
    return ''
  }
  
  return await fsp.readFile(file_path, 'utf8');
}