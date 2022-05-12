import File from 'components/File'
import { memo } from 'react'

const RenderFiles = ({ files, urlPath }) => {
  // const state = useContext(CloudContext)

  console.log('render')
  return (
        <>
            {
                files.map(file => (
                    <File name={file} url={urlPath} key={file} />
                ))
            }
        </>

  )
}

export default memo(RenderFiles)
