import { TOGGLE_DELETE_ELEMENT } from 'actionTypes/cloudTypes'
import { DispatchContext } from 'context/CloudContext'
import { useContext } from 'react'

const DeleteElement = ({ handleDelete }) => {
  const dispatch = useContext(DispatchContext)

  const handleOnCancel = () => {
    dispatch({ type: TOGGLE_DELETE_ELEMENT })
  }

  return (
    <>
    <form>
        <h2>¿Estás Seguro de que quieres eliminar este elemento?</h2>
        <div className="buttons-container">
          <button type="submit" onClick={handleDelete} className="accept">Aceptar</button>
          <button onClick={handleOnCancel} className="cancel">Cancelar</button>
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

export default DeleteElement
