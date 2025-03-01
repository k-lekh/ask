import * as cheerio from 'cheerio';

let _find = default_find
async function default_find(what, where) {
  const $ = cheerio.load(where);
  const $found = $(what)
  if ($found) {
    return $found.html()
  }

  return ''
}

export async function find(...args) {
  return await _find(...args);
}