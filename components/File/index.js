import { useState } from 'react'
import Folder from 'components/icons/Folder'
import FolderOpen from 'components/icons/FolderOpen'

const File = ({ url, name }) => {
  const [hover, setHover] = useState(false)
  const publicUrl = url.replace('storage', 'store')
  const urlFile = `${publicUrl}/${name}`

  // get extension
  // filename.split('.').pop();

  return (
    <>

        <a
          href={urlFile}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          download
        >
          <div>
            {!hover
              ? <Folder width={30} height={30} />
              : <FolderOpen width={30} height={30} />
            }{name}
          </div>
        </a>

      <style jsx>{`
        div {
          display: flex;
          font-size: 21px;
          gap: 25px;
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
