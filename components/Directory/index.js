import { useState } from 'react'
import Folder from 'components/icons/Folder'
import Link from 'next/link'
import FolderOpen from 'components/icons/FolderOpen'

const Directory = ({ url, name }) => {
  const [hover, setHover] = useState(false)
  const urlDirectory = `${url}/${name}`
  return (
    <>
      <Link href={urlDirectory} getServerSideProps={true}>
        <a
          href={urlDirectory}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div>
            {!hover
              ? <Folder width={30} height={30} />
              : <FolderOpen width={30} height={30} />
            }{name}
          </div>
        </a>
      </Link>

      <style jsx>{`
        div {
          display: flex;
          font-size: 21px;
          gap: 25px;
        }

        a {
          width: 100%;
          height: 75px;
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

export default Directory
