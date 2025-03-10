shipping_html = await read('https://saysmth.com/policies/shipping-policy')
shipping_content = await find(shipping_html, '#MainContent')[0].innerHTML

cart_html = await read('https://saysmth.com/cart')
cart_content = await find(cart_content, 'form[action="/cart"]')[0].innerHTML

await write(JSON.stringify({
  shipping_content,
  cart_content
}, null, 2), 'sea/widget.html.text')