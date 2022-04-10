import { useState } from 'react'
import Folder from 'components/icons/Folder'
import FolderOpen from 'components/icons/FolderOpen'

const File = ({ url, name }) => {
  const [hover, setHover] = useState(false)
  const publicUrl = url.replace('storage', 'store')
  const urlFile = `${publicUrl}/${name}`
  const nameContent = name.split('.')
  const fileName = nameContent.splice(0, nameContent.length - 1).join('.')
  const fileExtension = nameContent.pop()

  return (
    <>

        <a
          href={urlFile}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          download
        >
            {!hover
              ? <span className='icon'><Folder width={30} height={30} /></span>
              : <span className='icon'><FolderOpen width={30} height={30} /></span>
            }
            <span className='name'>{fileName}</span>
            <span className='extension'>.{fileExtension}</span>
        </a>

      <style jsx>{`

        a {
          display: flex;
          padding: 23px 33px;
          width: 100%;
          max-width: 100%;
          font-size: 21px;
          background: #2d2d2d;
          border-radius: 15px;
          border: 2px solid #2d2d2d;
          box-shadow: rgb(0 0 0 / 40%) 5px 5px 12px 0px;
          overflow: hidden;
          transition: all .5s ease;
        }

        a:hover {
          transform: scale(1.05)
        }

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
