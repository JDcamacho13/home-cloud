import reactDOM from "react-dom"
import { CloudContext } from "context/CloudContext"
import { useContext } from "react"
import { TOGGLE_CREATE_DIRECTORY, TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT, TOGGLE_UPLOAD } from "actionTypes/cloudTypes"

const Modal = ({ children }) => {
  const { state, dispatch } = useContext(CloudContext)

  const handleOnClick = (e) => {
    if (e.target.id === 'modal-bg') {
      if (state.createDirectory) {
        dispatch({ type: TOGGLE_CREATE_DIRECTORY })
      } else if (state.deleteElement) {
        dispatch({ type: TOGGLE_DELETE_ELEMENT })
      } else if (state.renameElement) {
        dispatch({ type: TOGGLE_RENAME_ELEMENT })
      } else if (state.uploadComplete) {
        dispatch({ type: TOGGLE_UPLOAD })
      }
    }
  }

  return reactDOM.createPortal(
    <>
      <div id="modal-bg" className="modal-bg" onClick={handleOnClick}>
        <div className="modal-content" >
          {children}
        </div>
      </div>

      <style jsx>{`

        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0 ,0 ,.5);
        }

        .modal-content {
          padding: 10px;
          width: 600px;
          max-width: 85%;
          height: 325px;
          background: #fff;
          color: #242424;
          border-radius: 15px;
        }
      `}</style>

    </>, 
    document.getElementById('modal')
  )
}

export default Modal
