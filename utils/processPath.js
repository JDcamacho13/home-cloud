const path = require('path')

const slash = process.platform === 'win32' ? '\\' : '/'

export default function processPath (urlPath) {
  const storage = process.env.NODE_ENV === 'development' ? 'public/store' : '/'
  const relativePath = urlPath || slash

  console.log(storage, relativePath)

  const absolutePath = path.join(storage, relativePath)

  return { relativePath, absolutePath }
}
