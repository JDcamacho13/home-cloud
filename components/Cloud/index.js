import { useRef, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from 'styles/Home.module.css'
import Directory from 'components/Directory'
import NavStorage from 'components/NavStorage'
import ButtonCloud from 'components/ButtonCloud'
import Modal from 'components/Modal'
import CreateDirectory from 'components/CreateDirectory'
import UploadingFile from 'components/UploadingFile'
import RenameElement from 'components/RenameElement'
import DeleteElement from 'components/DeleteElement'
import AddFolder from 'components/icons/AddFolder'
import AddFile from 'components/icons/AddFile'
import File from 'components/File'
import { CloudContext } from 'context/CloudContext'
import { TOGGLE_UPLOAD, TOGGLE_CREATE_DIRECTORY, TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT, TOGGLE_DRAG_ENTER, UPLOAD_PERCENTAGE, UPLOAD_COMPLETE } from 'actionTypes/cloudTypes'

const Cloud = ({ slug, content }) => {
  const { state, dispatch } = useContext(CloudContext)
  const router = useRouter()
  const fileRef = useRef()
  const urlPath = router.asPath

  console.log(state)

  const toggleModalCreateDirectory = () => {
    dispatch({ type: TOGGLE_CREATE_DIRECTORY })
  }

  const toggleUploadDialogBox = () => {
    fileRef.current.click()
  }

  const handleFileUpload = async () => {
    const url = slug ? `/${slug.join('/')}` : '/'

    const fd = new FormData()
    fd.append('file', fileRef.current.files[0])

    dispatch({ type: TOGGLE_UPLOAD })

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        dispatch({ type: UPLOAD_PERCENTAGE, payload: Math.round((event.loaded * 100) / event.total) })
      }
    }

    const response = await axios.post(`http://localhost:3000/api/upload${url}`, fd, config)

    if (response.data.data === 'success') {
      dispatch({ type: UPLOAD_COMPLETE })
      router.replace(router.asPath)
    }
    fileRef.current.value = ''
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    const url = slug ? `/${slug.join('/')}` + '/' + state.modificFilename : '/' + state.modificFilename
    console.log(url)
    const req = await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/deleteFile',
      data: {
        url
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (req.data.status) {
      router.replace(router.asPath)
      dispatch({ type: TOGGLE_DELETE_ELEMENT })
    } else {
      alert(req.data.message)
    }
  }

  const handleCreateDirectory = async (e) => {
    e.preventDefault()
    const directoryName = e.target.name.value
    const pathRelative = slug ? `/${slug.join('/')}` : '/'
    const req = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/createDirectory' + pathRelative,
      data: {
        name: directoryName
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (req.data.status) {
      router.replace(router.asPath)
      e.target.name.value = ''
      dispatch({ type: TOGGLE_CREATE_DIRECTORY })
    } else {
      alert(req.data.message)
    }
  }

  const handleDrop = async e => {
    e.preventDefault()

    const url = slug ? `/${slug.join('/')}` : '/'

    const fd = new FormData()
    fd.append('file', e.dataTransfer.files[0])

    dispatch({ type: TOGGLE_UPLOAD })

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        dispatch({ type: UPLOAD_PERCENTAGE, payload: Math.round((event.loaded * 100) / event.total) })
      }
    }

    const response = await axios.post(`http://localhost:3000/api/upload${url}`, fd, config)

    if (response.data.data === 'success') {
      dispatch({ type: UPLOAD_COMPLETE })
      router.replace(router.asPath)
    }
  }

  const handleDragEnter = e => {
    e.preventDefault()
    dispatch({ type: TOGGLE_DRAG_ENTER })
  }

  const handleDragLeave = e => {
    e.preventDefault()
    dispatch({ type: TOGGLE_DRAG_ENTER })
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  return (
    <>
      <NavStorage url={slug} />
      <main className={styles.container}>
        <div className='main-content'>
          <div
            className="drag-container"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
            <section>
              <div className="section-title">Carpetas</div>
              <div className="container-files">
                <ButtonCloud
                  onClick={toggleModalCreateDirectory}
                  title='Crear carpeta'
                  icon={<AddFolder width={30} height={30} />}
                />
                {
                  content.directories.map(i => (
                    <Directory name={i} url={urlPath} key={i} />
                  ))
                }
              </div>
            </section>
            <section>
              <div className="section-title">Archivos</div>
              <div className="container-files files">
                <ButtonCloud
                  onClick={toggleUploadDialogBox}
                  title='Subir archivo'
                  icon={<div className='file'><AddFile width={23} height={23} /></div>}
                  type='upload'
                  inputFile={<input type='file' ref={fileRef} onChange={handleFileUpload} />}
                />
                {
                  content.files.map(i => (
                    <File name={i} url={urlPath} key={i} />
                  ))
                }
              </div>
            </section>
          </div>
        </div>

        {
          state.createDirectory
            ? (
            <Modal>
              <CreateDirectory
                handleCreateDirectory={handleCreateDirectory}
              />
            </Modal>
              )
            : state.uploading
              ? (
            <Modal>
              <UploadingFile />
            </Modal>
                )
              : state.renameElement
                ? (
            <Modal>
              <RenameElement />
            </Modal>
                  )
                : state.deleteElement
                  ? (
            <Modal>
              <DeleteElement handleDelete={handleDelete} />
            </Modal>
                    )
                  : null
        }

      <style jsx>{`

        input[type='file'] {
          display: none;
        }

        .main-content {
          padding-bottom: 20px;
          height: 100%;
        }
        
        .drag-container {
          margin: 0 auto;
          height: 100%;
          background: ${state.dragEnter ? 'rgba(0, 0, 0, .20)' : 'transparent'};;
          border: ${state.dragEnter ? '2px dashed #09f' : '2px solid #1f1f1f'};
          border-radius: 10px;
        }

        .drag-container * {
          ${state.dragEnter && 'pointer-events: none;'}
        }

        .container-files {
          display: grid;
          grid-template-columns: 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        .container-files.files {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #ccc;
        }  
        
        @media (min-width: 768px) {
          .drag-container {
            padding: 25px;
          }
          .container-files {
            grid-template-columns: 1fr 1fr;
            gap: 30px 50px;
            margin-bottom: 50px;
          }
        }

        @media (min-width: 1024px) {
          .container-files {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        `}</style>

      </main>
    </>
  )
}

export default Cloud
