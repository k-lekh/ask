import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function read(source) {
  const task_path = path.resolve(`engine/tasks/${source}/${source}.md`);
  if (fs.existsSync(task_path)) {
    console.log(`read ${chalk.bgBlue('engine task')} from`, '\'' + source + '\'');
    return fs.readFileSync(task_path, 'utf8');
  }
  
  const source_path = path.resolve(source);
  if (fs.existsSync(source_path)) {
    console.log(
      `read ${source.endsWith('.ask') ? chalk.bgBlueBright('task') : chalk.bgGray('text')} from`,
      '\'' + source + '\''
    );
    return fs.readFileSync(source_path, 'utf8');
  }

  console.log(`read ${chalk.bgWhite('nothing')} from`, '\'' + source + '\'');
  return '';
}
