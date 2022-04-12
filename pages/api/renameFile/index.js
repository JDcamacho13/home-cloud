import fs from 'fs'
import path from 'path'
import processPath from 'utils/processPath'

export default async (req, res) => {
  const { body: { url, newName, extension } } = req
  const { absolutePath } = processPath()

  try {
    await fs.promises.rename(path.join(absolutePath, url), path.join(absolutePath, newName + extension))
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'Ha ocurrido un error al renombrar el archivo' + error
    })
  }

  res.json(
    {
      status: true,
      message: path.join(absolutePath, url)
    }
  )
}
