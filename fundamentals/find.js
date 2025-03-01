import * as cheerio from 'cheerio';

let _find = default_find
async function default_find(where, what) {


  const $ = cheerio.load(where);
  const $found = $(what)
  if ($found) {
    return $found.html()
  }

  return ''
}

export const find = _find