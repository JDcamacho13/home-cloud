import { TOGGLE_CREATE_DIRECTORY } from 'actionTypes/cloudTypes'
import { CloudContext } from 'context/CloudContext'
import { useContext } from 'react'

const CreateDirectory = ({ handleCreateDirectory }) => {
  const { dispatch } = useContext(CloudContext)

  const handleOnCancel = () => {
    dispatch({ type: TOGGLE_CREATE_DIRECTORY })
  }

  return (
    <>
    <form onSubmit={handleCreateDirectory}>
        <h2>Crear carpeta</h2>
        <label htmlFor="name" className="label">Ingresa el nombre de la carpeta</label>
        <input type="text" name="name" placeholder="Nombre de la carpeta" required autoComplete="off" />
        <div className="buttons-container">
          <button type="submit" className="accept">Aceptar</button>
          <button className="cancel" onClick={handleOnCancel}>Cancelar</button>
        </div>
      </form>

      <style jsx>{`

        form {
          display: grid;
          gap: 24px;
          justify-items: center;
          font-size: 21px;
          text-align: center;
        }

        h2 {
          margin: 0;
          font-size: 30px;
          text-align: center;
        }

        input {
          padding: 10px 0;
          max-width: 250px;
          text-align: center;
          font-size: 18px;
          color: white;
          background: none;
          border: none;
          border-bottom: 2px dashed white;
          outline: none;
          transition: all .5 ease;
        }

        input:hover {
          border-color: #09f;
        }

        input:focus {
          border-color: #09f;
        }

        .buttons-container {
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: row-reverse;
        }

        button {
          padding: 10px 15px;
          font-size: 18px;
          background: #2d2d2d;
          border-radius: 10px;
          border: 2px dashed #eee;
          max-width: 100%;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          transition: all .5s ease;
          cursor: pointer;
          color: #fff;
        }

        button:hover {
          color: #09f;
          border-color: #09f;
          transform: scale(1.05)
        }

        .cancel {
          background: none;
          box-shadow: none;
          border: 2px dashed transparent;
          outline: none;
        }

        .cancel:hover {
          background: #2d2d2d;
          color: #d62828;
          border: 2px dashed #d62828;
        }

      `}</style>
    </>
  )
}

export default CreateDirectory
