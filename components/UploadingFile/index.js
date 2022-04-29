import { useContext } from 'react'
import { CloudContext, DispatchContext } from 'context/CloudContext'
import { TOGGLE_UPLOAD } from 'actionTypes/cloudTypes'

const UploadingFile = () => {
  const state = useContext(CloudContext)
  const dispatch = useContext(DispatchContext)
  const { darkmode } = state

  const handleOnClose = () => {
    dispatch({ type: TOGGLE_UPLOAD })
  }

  return (
    <>
      <div className="container">
      {
        !state.uploadComplete
          ? (
          <>
            <h1>Subiendo archivo</h1>
            <div className="progress-bar">
              <div className="progress-bar-fill" />
            </div>
            {
              state.uploadPercent === 100
                ? (<h3>Procesando archivo...</h3>)
                : (<div className="progress-bar-percent">{state.uploadPercent}%</div>)
            }
          </>
            )
          : (
          <>
            <h1>Archivo subido correctamente</h1>
            <button onClick={handleOnClose}>Cerrar</button>
          </>
            )
      }

      </div>

      <style jsx>{`
        .container {
          display: grid;
          gap: 24px;
          justify-items: center;
          font-size: 21px;
          text-align: center;
        }
        
        h1 {
          margin: 0;
          font-size: 1.8rem;
        }

        h3 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 400;
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

        .progress-bar {
          width: 100%;
          height: 30px;
          background-color: #e5e5e5;
          border-radius: 10px;
        }

        .progress-bar-fill {
          width: ${state.uploadPercent}%;
          height: 30px;
          background-color: #09f;
          border-radius: 10px;
        }

        .progress-bar-percent {
          font-size: 1.5rem;
        }
      `}</style>
    </>
  )
}
export default UploadingFile
