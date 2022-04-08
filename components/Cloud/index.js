import { useState } from 'react'
import Directory from 'components/Directory'
import NavStorage from 'components/NavStorage'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'
import ButtonCreateDirectory from 'components/ButtonCreateDirectory'
import Modal from 'components/Modal'
import axios from 'axios'
import CreateDirectory from 'components/CreateDirectory'
import UploadingFile from 'components/UploadingFile'

const DRAG_FILES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

const Cloud = ({ slug, content }) => {
  const [createDirectoryModal, setCreateDirectoryModal] = useState(false)
  const [dragFiles, setDragFiles] = useState(DRAG_FILES_STATES.NONE)
  const [uploadProgress, setUploadProgress] = useState({ completed: false, total: 0 })
  const router = useRouter()
  const urlPath = router.asPath

  const toggleModalCreateDirectory = (e) => {
    e.preventDefault()
    setCreateDirectoryModal(!createDirectoryModal)
  }

  const handleCreateDirectory = async (e) => {
    e.preventDefault()
    const directoryName = e.target.name.value
    const pathRelative = slug ? `/${slug.join('/')}` : '/'
    const req = await axios({
      method: 'post',
      url: 'http://192.168.1.51:3000/api/createDirectory' + pathRelative,
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
      setCreateDirectoryModal(!createDirectoryModal)
    } else {
      alert(req.data.message)
    }
  }

  const handleDragEnter = e => {
    console.log('Entro')
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
    console.log(fd)
    setDragFiles(DRAG_FILES_STATES.UPLOADING)
    setCreateDirectoryModal(!createDirectoryModal)
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

    const response = await axios.post(`http://192.168.1.51:3000/api/upload${url}`, fd, config)
    console.log(response.data)
    if (response.data.data === 'success') {
      setUploadProgress({ completed: true, total: 0 })
      router.replace(router.asPath)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const showModalUploading = dragFiles === DRAG_FILES_STATES.UPLOADING

  const handleFinishUploading = () => {
    setDragFiles(DRAG_FILES_STATES.NONE)
    setCreateDirectoryModal(!createDirectoryModal)
    setUploadProgress({ completed: false, total: 0 })
  }

  return (
    <div className={styles.container}>

      <div>
        <NavStorage url={slug} />
      </div>

      <div className="drag-container"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <section>
          <div className="section-title">Carpetas</div>
          <div className="container-files">
            <ButtonCreateDirectory onClick={toggleModalCreateDirectory}/>
            {
              content.directories.map(i => (
                <Directory name={i} url={urlPath} key={i}/>
              ))
            }
          </div>
        </section>

        <section>
          <div className="section-title">Archivos</div>
          <div className="container-files">
            <ButtonCreateDirectory onClick={toggleModalCreateDirectory}/>
            {
              content.directories.map(i => (
                <Directory name={i} url={urlPath} key={i}/>
              ))
            }
          </div>
        </section>

      </div>

      <Modal visible={createDirectoryModal} setVisible={setCreateDirectoryModal} uploading={showModalUploading}>
        {
          !showModalUploading
            ? (
            <CreateDirectory
              handleCreateDirectory={handleCreateDirectory}
              toggleModalCreateDirectory={toggleModalCreateDirectory}
            />
              )
            : (
              <UploadingFile percent={uploadProgress.total} completed={uploadProgress.completed} handleClick={handleFinishUploading}/>
              )
        }

      </Modal>

      <style jsx>{`

        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }  
        
        .drag-container {
          margin: 0 auto;
          
          background: ${dragFiles === DRAG_FILES_STATES.DRAG_OVER ? 'rgba(0, 0, 0, .20)' : 'transparent'};;
          max-width: 1200px;
          width: 90%;
          min-height: 65vh;
          border: ${dragFiles === DRAG_FILES_STATES.DRAG_OVER ? '2px dashed #09f' : '2px solid #1f1f1f'};
          border-radius: 10px;
          padding: 25px;
        }

        .drag-container * {
          ${dragFiles === DRAG_FILES_STATES.DRAG_OVER && 'pointer-events: none;'}
        }

        .container-files {
          margin-bottom: 50px;
          display: grid;
          
          grid-template-columns: 1fr 1fr 1fr;
          gap: 50px 50px;
        }

        @media (max-width: 1215px) {
          .container-files {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 678px) {
          .container-files {
            grid-template-columns: 1fr;
            gap: 30px 50px;
          }
        }
      `}</style>

    </div>
  )
}

export default Cloud
