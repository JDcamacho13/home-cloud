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
  const publicUrl = url.replace('storage', 'store')
  const urlFile = `${publicUrl}/${name}`
  const extensionFile = name.split('.').pop()

  return (
    <>

        <a href={urlFile} download >
          <div>
            {extension[extensionFile] === undefined
              ? <FileIcon width={30} height={30} />
              : extension[extensionFile]
            }

            {name}
          </div>
        </a>

      <style jsx>{`
        div {
          display: flex;
          font-size: 21px;
          gap: 25px;
          color: #fff;
        }

        a {
          width: 100%;
          padding: 23px 33px;
          background: #2d2d2d;
          border-radius: 15px;
          border: 2px solid #2d2d2d;
          max-width: 100%;
          box-shadow: rgb(0 0 0 / 40%) 5px 5px 12px 0px;;
          transition: all .5s ease;
        }

        a:hover {
          transform: scale(1.05)
        }
        
      `}</style>
    </>
  )
}

export default File
