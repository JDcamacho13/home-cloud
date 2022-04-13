const DeleteElement = ({ toggleModalDeleting }) => {
  return (
      <>
        <h2>¿Estas Seguro de que quieres eliminar este elemento?</h2>
        <div className="buttons-container">
          <button className="accept">Aceptar</button>
          <button onClick={() => toggleModalDeleting(false)} className="cancel">Cancelar</button>
        </div>

        <style jsx>{`
          h2 {
            font-size: 30px;
            text-align: center;
          }

          .buttons-container {
            margin: 100px auto 0 auto;
            width: 80%;
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

export default DeleteElement
