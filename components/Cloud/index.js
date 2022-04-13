import { useState, useRef, useContext } from 'react'
import Directory from 'components/Directory'
import NavStorage from 'components/NavStorage'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'
import ButtonCloud from 'components/ButtonCloud'
import Modal from 'components/Modal'
import axios from 'axios'
import CreateDirectory from 'components/CreateDirectory'
import UploadingFile from 'components/UploadingFile'
import AddFolder from 'components/icons/AddFolder'
import AddFile from 'components/icons/AddFile'
import File from 'components/File'
import { Context } from 'context/Context'

const DRAG_FILES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

const Cloud = ({ slug, content }) => {
  const [dragFiles, setDragFiles] = useState(DRAG_FILES_STATES.NONE)
  const [uploadProgress, setUploadProgress] = useState({ completed: false, total: 0 })
  const router = useRouter()
  const fileRef = useRef()
  const urlPath = router.asPath

  const { isModalOpen, toggleModal, modalContent, setModalContent } = useContext(Context)

  const toggleModalCreateDirectory = (e) => {
    e.preventDefault()
    toggleModal(true)
    setModalContent(<CreateDirectory
      handleCreateDirectory={handleCreateDirectory}
      toggleModalCreateDirectory={toggleModal}
    />)
  }

  const handleFileUpload = async () => {
    const url = slug ? `/${slug.join('/')}` : '/'

    const fd = new FormData()
    fd.append('file', fileRef.current.files[0])

    setDragFiles(DRAG_FILES_STATES.UPLOADING)
    toggleModal(true)
    setModalContent('Uploading')
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        setUploadProgress((prevState) => (
          {
            completed: prevState.completed,
            total: Math.round((event.loaded * 100) / event.total)
          }
        ))
      }
    }

    const response = await axios.post(`http://localhost:3000/api/upload${url}`, fd, config)

    if (response.data.data === 'success') {
      setUploadProgress({ completed: true, total: 0 })
      router.replace(router.asPath)
    }
    fileRef.current.value = ''
  }

  const toggleModalUploadFile = () => {
    fileRef.current.click()
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
      toggleModal(false)
    } else {
      alert(req.data.message)
    }
  }

  const handleDragEnter = e => {
    e.preventDefault()
    setDragFiles(DRAG_FILES_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDragFiles(DRAG_FILES_STATES.NONE)
  }

  const handleDrop = async e => {
    e.preventDefault()

    const url = slug ? `/${slug.join('/')}` : '/'

    const fd = new FormData()
    fd.append('file', e.dataTransfer.files[0])

    setDragFiles(DRAG_FILES_STATES.UPLOADING)
    toggleModal(true)
    setModalContent(setModalContent('Uploading'))
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        setUploadProgress((prevState) => (
          {
            completed: prevState.completed,
            total: Math.round((event.loaded * 100) / event.total)
          }
        ))
      }
    }

    const response = await axios.post(`http://localhost:3000/api/upload${url}`, fd, config)

    if (response.data.data === 'success') {
      setUploadProgress({ completed: true, total: 0 })
      router.replace(router.asPath)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleFinishUploading = () => {
    setDragFiles(DRAG_FILES_STATES.NONE)
    toggleModal(false)
    setUploadProgress({ completed: false, total: 0 })
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
                  onClick={toggleModalUploadFile}
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
          isModalOpen && (
            <Modal setVisible={toggleModal}>
              {modalContent === 'Uploading'
                ? <UploadingFile
                  percent={uploadProgress.total}
                  completed={uploadProgress.completed}
                  handleClick={handleFinishUploading}
                />
                : modalContent}

            </Modal>
          )
        }

        {/* {
          showModalUploading
            ? (
            <Modal setVisible={setShowModalUploading} uploading={showModalUploading}>
              <UploadingFile
                percent={uploadProgress.total}
                completed={uploadProgress.completed}
                handleClick={handleFinishUploading}
              />
          </Modal>
              )
            : showModalCreate
              ? (
            <Modal setVisible={setShowModalCreate}>
              <CreateDirectory
                handleCreateDirectory={handleCreateDirectory}
                toggleModalCreateDirectory={toggleModalCreateDirectory}
              />
            </Modal>
                )
              : showModalDeleting
                ? (
            <Modal setVisible={setShowModalDeleting}>
              <DeleteElement
                toggleModalDeleting={() => setShowModalDeleting(false)}
              />
            </Modal>
                  )
                : showModalRenaming
                  ? (
            <Modal setVisible={setShowModalRenaming}>
              <RenameElement
                toggleModalRenaming={() => setShowModalRenaming(false)}
              />
            </Modal>
                    )
                  : null
        } */}

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
          background: ${dragFiles === DRAG_FILES_STATES.DRAG_OVER ? 'rgba(0, 0, 0, .20)' : 'transparent'};;
          border: ${dragFiles === DRAG_FILES_STATES.DRAG_OVER ? '2px dashed #09f' : '2px solid #1f1f1f'};
          border-radius: 10px;
        }

        .drag-container * {
          ${dragFiles === DRAG_FILES_STATES.DRAG_OVER && 'pointer-events: none;'}
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
