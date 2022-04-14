import { useRef, useContext } from 'react'
import { CloudContext } from 'context/CloudContext'
import CompressIcon from 'components/icons/CompressIcon'
import ExcelIcon from 'components/icons/ExcelIcon'
import FileIcon from 'components/icons/FileIcon'
import ImageIcon from 'components/icons/ImageIcon'
import IsoIcon from 'components/icons/IsoIcon'
import PdfIcon from 'components/icons/PdfIcon'
import PowerPointIcon from 'components/icons/PowerPointIcon'
import SoundIcon from 'components/icons/SoundIcon'
import VideoIcon from 'components/icons/VideoIcon'
import WordIcon from 'components/icons/WordIcon'
import OptionsMenu from 'components/OptionsMenu'
import ButtonOption from 'components/ButtonOption'
import { TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT } from 'actionTypes/cloudTypes'

const extension = {
  jpg: <ImageIcon width={30} height={30} />,
  png: <ImageIcon width={30} height={30} />,
  jpeg: <ImageIcon width={30} height={30}/>,
  mov: <VideoIcon width={30} height={30} />,
  mkv: <VideoIcon width={30} height={30} />,
  mp4: <VideoIcon width={30} height={30} />,
  wmv: <VideoIcon width={30} height={30} />,
  flv: <VideoIcon width={30} height={30}/>,
  rar: <CompressIcon width={30} height={30} />,
  zip: <CompressIcon width={30} height={30} />,
  mp3: <SoundIcon width={30} height={30} />,
  wav: <SoundIcon width={30} height={30} />,
  ogg: <SoundIcon width={30} height={30} />,
  iso: <IsoIcon width={30} height={30} />,
  pdf: <PdfIcon width={30} height={30} />,
  xlsx: <ExcelIcon width={30} height={30} />,
  docx: <WordIcon width={30} height={30} />,
  pptx: <PowerPointIcon width={30} height={30} />
}

const File = ({ url, name }) => {
  const { dispatch } = useContext(CloudContext)
  const publicUrl = url.replace('storage', 'store')
  const downloadRef = useRef(null)
  const urlFile = `${publicUrl}/${name}`
  const nameContent = name.split('.')
  const fileName = nameContent.splice(0, nameContent.length - 1).join('.')
  const fileExtension = nameContent.pop()

  const handleDownload = () => {
    downloadRef.current.setAttribute('download', fileName)
  }

  const onRename = e => {
    e.preventDefault()
    dispatch({ type: TOGGLE_RENAME_ELEMENT })
  }

  const onDelete = e => {
    e.preventDefault()
    dispatch({ type: TOGGLE_DELETE_ELEMENT })
  }

  return (
    <>
      <a onClick={handleDownload} href={urlFile} ref={downloadRef}>
          {extension[fileExtension] === undefined
            ? <span className='icon'><FileIcon width={30} height={30} /></span>
            : <span className='icon'>{extension[fileExtension]}</span>
          }
          <span className='name'>{fileName}</span>
          <span className='extension'>.{fileExtension}</span>
          <OptionsMenu>
            <ButtonOption title='Renombrar' onClick={onRename} />
            <ButtonOption title='Borrar' onClick={onDelete} />
          </OptionsMenu>
      </a>

      <style jsx>{`

        a {
          position: relative;
          display: flex;
          padding: 23px 33px;
          width: 100%;
          min-width: 100%;
          font-size: 21px;
          background: #2d2d2d;
          border-radius: 15px;
          border: 2px solid #2d2d2d;
          box-shadow: rgb(0 0 0 / 40%) 5px 5px 12px 0px;
          transition: all .5s ease;
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
