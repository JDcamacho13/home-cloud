import { memo, useMemo, lazy, Suspense, useContext } from 'react'
import { extensionIconFinder } from 'utils/extensionIconFinder'
import { TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT } from 'actionTypes/cloudTypes'
import { DispatchContext } from 'context/CloudContext'
import OptionsMenu from 'components/OptionsMenu'
import ButtonOption from 'components/ButtonOption'

const IconFileSelect = ({ fileName, fileExtension, name }) => {
  const extensionIcon = extensionIconFinder(fileExtension)
  const Icon = lazy(() => import(`components/icons/${extensionIcon}`))
  const dispatch = useContext(DispatchContext)

  return useMemo(() => {
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

        <style jsx>{`
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
  }, [fileName, fileExtension, dispatch, name])
}

export default memo(IconFileSelect)
