const path = require('path')

const slash = process.platform === 'win32' ? '\\' : '/'

export default function processPath (urlPath) {
  const storage = ''
  const relativePath = urlPath || slash

  const absolutePath = path.join(storage, relativePath)

  return { relativePath, absolutePath }
}
