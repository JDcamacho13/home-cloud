import { TOGGLE_DELETE_ELEMENT } from 'actionTypes/cloudTypes'
import { DispatchContext, CloudContext } from 'context/CloudContext'
import { useContext } from 'react'

const DeleteElement = ({ handleDelete }) => {
  const dispatch = useContext(DispatchContext)
  const state = useContext(CloudContext)
  const { darkmode } = state

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
          background: ${darkmode ? '#2d2d2d' : '#fff'};
          border-radius: 10px;
          border: 2px dashed ${darkmode ? '#eee' : '#09f'};;
          max-width: 100%;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          transition: all .5s ease;
          cursor: pointer;
          color: ${darkmode ? '#fff' : '#09f'};
        }

        button:hover {
          color: ${darkmode ? '#09f' : '#fff'};
          border: ${darkmode ? '2px dashed #09f' : '2px solid #09f'};
          ${!darkmode && 'background: #09f'};
          transform: scale(1.05)
        }

        .cancel {
          background: none;
          ${darkmode && 'box-shadow: none'};
          border: 2px dashed ${darkmode ? 'transparent' : '#d62828'};
          outline: none;
          ${!darkmode && 'color: #d62828;'};
          
        }

        .cancel:hover {
          background: ${darkmode ? '#2d2d2d' : '#d62828'};
          color: ${darkmode ? '#d62828' : '#fff'};
          border: ${darkmode ? '2px dashed #d62828' : '2px solid #d62828'};
        }
      `}</style>
    </>
  )
}

export default DeleteElement
