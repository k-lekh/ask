import md5 from 'md5'

let _hash = default_hash
async function default_hash(text) {
  return md5(text)
}

export const hash = _hash