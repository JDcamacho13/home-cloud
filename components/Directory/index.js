import { useState, useContext } from 'react'
import { CloudContext } from 'context/CloudContext'
import { TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT } from 'actionTypes/cloudTypes'
import Folder from 'components/icons/Folder'
import Link from 'next/link'
import FolderOpen from 'components/icons/FolderOpen'
import OptionsMenu from 'components/OptionsMenu'
import ButtonOption from 'components/ButtonOption'

const Directory = ({ url, name }) => {
  const { state: { darkmode }, dispatch } = useContext(CloudContext)
  const [hover, setHover] = useState(false)
  const urlDirectory = `${url}/${name}`

  const onRename = e => {
    e.preventDefault()
    dispatch({ type: TOGGLE_RENAME_ELEMENT, payload: name })
  }

  const onDelete = e => {
    e.preventDefault()
    dispatch({ type: TOGGLE_DELETE_ELEMENT, payload: name })
  }

  return (
    <>
      <Link href={urlDirectory} getServerSideProps={true}>
        <a
          href={urlDirectory}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
            {!hover
              ? <span className='icon'><Folder width={30} height={30} /></span>
              : <span className='icon'><FolderOpen width={30} height={30} /></span>
            }
            <span className='name'>{name}</span>
            <OptionsMenu>
              <ButtonOption title='Renombrar' onClick={onRename} />
              <ButtonOption title='Borrar' onClick={onDelete} />
            </OptionsMenu>
        </a>
      </Link>

      <style jsx>{`
      
        a {
          position: relative;
          display: flex;
          padding: 23px 33px;
          width: 100%;
          max-width: 100%;
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

        .icon {
          display: block;
          margin-right: 20px;
          white-space: nowrap;
        }

        .name{
          flex: 1 1;
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

export default Directory
