payload.split('\n').map(async line => await ask())

i try always work with a single string, so i don't need bracket in arrow function,
so `async (line) => await` becomes `async line => await`,
and this "async line" is beautiful.