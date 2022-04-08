import fs from 'fs'
import processPath from 'utils/processPath'

export default async (req, res) => {
  const { query } = req
  const { slug } = query
  const url = slug.join('/')
  const { absolutePath } = processPath(url)
  const content = { files: [], directories: [] }

  const dir = await fs.promises.opendir(absolutePath)

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      content.directories.push(dirent.name)
    } else {
      content.files.push(dirent.name)
    }
  }

  content.directories.sort()
  content.files.sort()

  res.json({
    ...content,
    status: true
  })
}
