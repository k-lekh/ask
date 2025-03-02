import chalk from 'chalk'

'bgBlue,bgCyan,bgGray,cyan,red,green'.split(',').forEach(color => {
  console[color] = () => chalk[color]()
})