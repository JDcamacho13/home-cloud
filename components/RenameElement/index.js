import { TOGGLE_RENAME_ELEMENT } from "actionTypes/cloudTypes"
import { CloudContext } from "context/CloudContext"
import { useContext } from "react"

const RenameElement = () => {
  const { dispatch } = useContext(CloudContext)

  const handleOnCancel = () => {
    dispatch({ type: TOGGLE_RENAME_ELEMENT })
  }

  return (
      <>
        <h2>Renombrar elemento</h2>
        <form>
            <label htmlFor="name" className="label">Nombre del elemento</label><br />
            <input type="text" name="name" placeholder="Nueva nombre..." required autoComplete="off" />
            <div className="buttons-container">
            <button type="submit" className="accept">Aceptar</button>
            <button onClick={handleOnCancel} className="cancel">Cancelar</button>
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
