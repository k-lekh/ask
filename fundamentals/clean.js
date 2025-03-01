let _clean = default_clean
async function default_clean(payload = '') {
  if (typeof payload === 'function') {
    _clean = payload
    return ''
  }

  let result = payload
  
  new Array(['```html', '```xml', '```json', '```javascript', '```css']).forEach(str => {
    if (result.startsWith(str)) {
      result = result.substring(str.length)
    }
  })
  
  new Array(['```']).forEach(str => {
    if (result.endsWith(str)) {
      result = result.substring(0, result.length - str.length)
    }
  })

  return result
}

export const clean = _clean