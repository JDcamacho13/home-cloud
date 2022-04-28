import { memo, useRef, useContext, lazy, Suspense } from 'react'
import { CloudContext } from 'context/CloudContext'
import { extensionIconFinder } from '../../utils/extensionIconFinder'
import OptionsMenu from 'components/OptionsMenu'
import ButtonOption from 'components/ButtonOption'
import { TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT } from 'actionTypes/cloudTypes'

const File = ({ url, name }) => {
  const { state: { darkmode }, dispatch } = useContext(CloudContext)
  const publicUrl = url.replace('storage', 'store')
  const downloadRef = useRef(null)
  const urlFile = `${publicUrl}/${name}`
  const nameContent = name.split('.')
  const fileName = nameContent.splice(0, nameContent.length - 1).join('.')
  const fileExtension = nameContent.pop()
  const extensionIcon = extensionIconFinder(fileExtension)
  const Icon = lazy(() => import(`components/icons/${extensionIcon}`))

  const handleDownload = () => {
    downloadRef.current.setAttribute('download', fileName)
  }

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
      <a onClick={handleDownload} href={urlFile} ref={downloadRef}>
          <span className='icon'>
            <Suspense fallback={null}>
              <Icon width={30} height={30} />
            </Suspense>
          </span>
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

export default memo(File)
