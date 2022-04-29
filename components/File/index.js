import { useRef, useContext } from 'react'
import { CloudContext } from 'context/CloudContext'
import IconFileSelect from 'components/IconFileSelect'

const File = ({ url, name }) => {
  const { darkmode } = useContext(CloudContext)
  const publicUrl = url.replace('storage', 'store')
  const downloadRef = useRef(null)
  const urlFile = `${publicUrl}/${name}`
  const nameContent = name.split('.')
  const fileName = nameContent.splice(0, nameContent.length - 1).join('.')
  const fileExtension = nameContent.pop()

  const handleDownload = () => {
    downloadRef.current.setAttribute('download', fileName)
  }

  return (
    <>
        <a onClick={handleDownload} href={urlFile} ref={downloadRef}>
            <IconFileSelect fileName={fileName} fileExtension={fileExtension} name={name} />
        </a>

        <style jsx>{`

          a {
            position: relative;
            display: flex;
            padding: 23px 33px;
            width: 100%;
            min-width: 100%;
            font-size: 21px;
            background: ${darkmode ? '#2d2d2d' : 'white'};
            border-radius: 15px;
            border: 2px solid #2d2d2d;
            box-shadow: rgb(0 0 0 / 40%) 5px 5px 12px 0px;
            transition: all .5s ease;
          }
          
          a:hover {
            border: 2px solid #09f;
            color: #09f;
          }

          /* a:hover {
            transform: scale(1.05);
          }  */

          .icon {
            display: block;
            margin-right: 20px;
            white-space: nowrap;
          }

          .name{
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 0;
            min-width: 0;
          }

        `}</style>
      </>
  )
}

export default File
