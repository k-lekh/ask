Every payload is a string.
No exceptions, no errors, no objects, no json, no arrays.
String every time.
If you need a more complex data structure, then you use js.
Ask fundamentals receives strings and output string.
`read(non/existing/file) === ''`

# No references
Since there are only strings, and string arguments in js are passed by value, in other words, copied, we can change any arguments, or sorce data without any problems.
We can run a routine and change it in a parallel process with no harm.
Any data will be read as text, in other words, copied from source.