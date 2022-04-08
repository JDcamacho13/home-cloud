import fs from 'fs'
import path from 'path'
import processPath from 'utils/processPath'

export default async (req, res) => {
  const { body: { name } } = req
  const { absolutePath } = processPath()

  const dir = await fs.promises.opendir(absolutePath)

  for await (const dirent of dir) {
    if (dirent.isDirectory() && dirent.name === name) {
      return res.status(400).json({
        status: false,
        message: 'Ya existe esta carpeta'
      })
    }
  }

  try {
    await fs.promises.mkdir(path.join(absolutePath, name))
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'Ha ocurrido un error'
    })
  }

  res.setHeader('access-control-allow-origin', '*')
  res.json({
    status: true
  })
}
