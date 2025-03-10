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
  
  destination.split('/').slice(0, -1).reduce((acc, x) => {
    acc = acc ? `${acc}/${x}` : x
    const y = path.resolve(acc);
    if (!fs.existsSync(y)) {
      fs.mkdirSync(y)
    }
    return acc
  }, '')

  try {
    const file_path = path.resolve(destination);
    await fsp.writeFile(file_path , text, { flag: 'w' });
    console.log(chalk.gray(`write ${file_path}`));
    return destination
  } catch(error) {
    return ''
  }
}