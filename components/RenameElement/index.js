import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const RenameElement = ({ url, toggleModalRenaming, fileExtension = '' }) => {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleRename = async (e) => {
    e.preventDefault()

    const urlFile = url.replace('/store', '')
    const extension = fileExtension.length > 0 ? `.${fileExtension}` : ''
    const req = await axios({
      method: 'put',
      url: 'http://localhost:3000/api/renameFile',
      data: {
        url: urlFile,
        newName: name,
        extension
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (req.data.status) {
      router.replace(router.asPath)
      toggleModalRenaming()
    } else {
      alert(req.data.message)
    }
  }

  return (
      <>
        <h2>Renombrar</h2>
        <form>
            <label htmlFor="name" className="label">Nuevo Nombre</label><br />
            <input type="text" name="name" placeholder="Nuevo nombre..." required autoComplete="off" onChange={(e) => setName(e.target.value)} />
            <div className="buttons-container">
            <button onClick={handleRename} type="submit" className="accept">Aceptar</button>
            <button onClick={toggleModalRenaming} className="cancel">Cancelar</button>
            </div>
        </form>

        <style jsx>{`
            h2 {
            font-size: 30px;
            text-align: center;
            }

            form {
            width: 80%;
            margin: 0 auto;
            font-size: 21px;
            }

            input {
            margin: 5px 0 20px 0;
            width: 100%;
            height: 32px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding-left: 15px;
            outline: none;
            }

            input:focus {
            border-color: #333;
            }

            .buttons-container {
            margin: 30px 0;
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-direction: row-reverse;
            }

            button {
            min-width: 105px;
            width: 40%;
            font-size: 18px;
            padding: 10px 15px;
            border-radius: 7.5px;
            font-weight: 600;
            }

            .cancel {
            background: #fff;
            color: #767676;
            border: 2px solid #aaa;
            cursor: pointer;
            transition: background 0.5s ease;
            }

            .cancel:hover {
            background: #aaa;
            color: #fff;
            }

            .accept {
            background: #187ff5;
            color: #fff;
            border: 2px solid #187ff5;
            cursor: pointer;
            transition: background 0.5s ease;
            }

            .accept:hover {
            background: #09f;
            border: 2px solid #09f;
            }

        `}</style>
      </>
  )
}

export default RenameElement
