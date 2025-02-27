import fs from 'fs';
import path from 'path';

export async function read(source) {
  const task_path = path.resolve(`./tasks/${source}.md`);
  if (fs.existsSync(task_path)) {
    console.log('read task from', source);
    return fs.readFileSync(task_path, 'utf8');
  }
  
  const source_path = path.resolve(source);
  if (fs.existsSync(source_path)) {
    console.log('read text from', source);
    return fs.readFileSync(source_path, 'utf8');
  }

  console.log('read nothing from', source);
  return '';
}
