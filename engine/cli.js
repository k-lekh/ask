import { ask } from './ask.js';
import readline from 'readline';
import chalk from 'chalk';
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

io.on('line', async (input) => {
  console.log(chalk.bgGray(await ask(input)));
});

function exit(code) {
  console.log(chalk.bgRed(code));
  io.close();
  process.exit(0);
}

process.on('SIGINT', () => exit('SIGINT')); 
process.on('SIGTERM', () => exit('SIGTERM'));

console.log(chalk.gray('Program is running.\n'));