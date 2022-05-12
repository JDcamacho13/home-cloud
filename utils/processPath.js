const path = require('path')

const slash = process.platform === 'win32' ? '\\' : '/'

export default function processPath (urlPath) {
  const storage = __dirname.split(slash)
  const relativePath = urlPath || slash

  console.log(storage, relativePath)

  const absolutePath = path.join(...storage, relativePath)

  return { relativePath, absolutePath }
}
