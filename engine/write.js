import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { promises as fsp } from 'fs';
export async function write(destination, text, overwrite = '.html') {
  /**
   * TODO: Support remote destinations
   * destination = 'POST https://api.shopify.com/ai/get_products'
   */
  try {
    const file_path = path.resolve(destination);
    if (fs.existsSync(file_path)) {
      const ext = '.' + file_path.split('.').pop().trim();
      if (overwrite !== true && ext !== overwrite) {
        throw chalk.bgRed(`Declined overwrite for ${file_path}`);
      }
    }
    await fsp.writeFile(file_path , text);
    return chalk.bgGreen(`Saved to ${file_path}`);
  } catch(error) {
    return error;
  }
}