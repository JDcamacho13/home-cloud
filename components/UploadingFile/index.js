const UploadingFile = ({ percent, completed, handleClick }) => {
  return (
    <>
      <div className="container">
      {
        !completed
          ? (
          <div>
            <h1>Subiendo archivo</h1>
            <div className="progress-bar">
              <div className="progress-bar-fill" />
            </div>
            {
              percent === 100
                ? (<h3>Procesando archivo...</h3>)
                : (<div className="progress-bar-percent">{percent}%</div>)
            }
          </div>
            )
          : (
          <div>
            <h1>Archivo subido correctamente</h1>
            <button className="btn" onClick={handleClick} >Cerrar</button>
          </div>
            )
      }

      </div>

      <style jsx>{`
        .btn {
          display: block;
          margin: 0 auto;
          min-width: 105px;
          width: 40%;
          font-size: 18px;
          padding: 10px 15px;
          border-radius: 7.5px;
          font-weight: 600;
          background: #187ff5;
          color: #fff;
          border: 2px solid #187ff5;
          cursor: pointer;
          transition: background 0.5s ease;
        }

        .btn:hover {
          background: #09f;
          border: 2px solid #09f;
        }

        .container {
          margin: 80px 0;
        }

        h1 {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        h3 {
          text-align: center;
          font-size: 1.4rem;
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .progress-bar {
          margin: 0 auto;
          width: 80%;
          height: 15px;
          background-color: #e5e5e5;
          border-radius: 2px;
          margin-bottom: 10px;
        }

        .progress-bar-fill {
          width: ${percent}%;
          height: 15px;
          background-color: #4caf50;
          border-radius: 5px;
        }

        .progress-bar-percent {
          text-align: center;
          font-size: 1.5rem;
          margin-top: 10px;
        }
      `}</style>
    </>
  )
}
export default UploadingFile
