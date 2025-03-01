import * as cheerio from 'cheerio';

let _find = default_find
async function default_find(target, payload) {
  if (typeof target === 'function') {
    _find = target
    return ''
  }

  const $ = cheerio.load(payload);
  const $target = $(target)
  if ($target) {
    return $target.html()
  }

  return ''
}

export const find = _find