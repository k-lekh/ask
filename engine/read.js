import fg from 'fast-glob';
import { promises as fsp } from 'fs';
export async function read(resource = '') {
  if (resource.toLowerCase().startsWith('https://')) {
    console.log('async');
    return fetch(resource).then(r => r.text());
  }

  if (resource.toLocaleLowerCase() === 'date') {
    return Date.now().toString();
  }

  const files = await fg(resource); 
  const list = await Promise.all(
    files.map(async (file_path) => {
      const file_text = await fsp.readFile(file_path, 'utf8');
      return file_text;
    })
  );
  return list.join('\n\n');
}