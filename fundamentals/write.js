import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { promises as fsp } from 'fs';
export async function write(text, destination) {
  /**
   * TODO: Support remote destinations
   * destination = 'POST https://api.shopify.com/ai/get_products'
   */
  if (!destination) {
    console.log(chalk.bgWhite('Write without destination'))
    console.log(chalk.white(text))
    return ''
  }
  try {
    const file_path = path.resolve(destination);
    if (fs.existsSync(file_path)) {
      const ext = '.' + file_path.split('.').pop().trim();
      if (overwrite !== true) {
        console.error(chalk.bgRed(`Declined to overwrite ${file_path}`));
      }
    }
    await fsp.writeFile(file_path , text);
    console.log(chalk.green(`Saved to ${file_path}`));
    return text
  } catch(error) {
    return ''
  }
}