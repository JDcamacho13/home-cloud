import AddFolder from 'components/icons/AddFolder'

const ButtonCreateDirectory = ({ onClick }) => {
  return (
    <>
        <button onClick={onClick} >
          <div className="create-dir">
            <AddFolder width={30} height={30} /> Crear carpeta
          </div>
        </button>

      <style jsx>{`
        div {
          display: flex;
          font-size: 21px;
          gap: 25px;
        }

        .create-dir > :global(svg) {
          margin: -5px 0;
        }

        button {
          width: 100%;
          height: 75px;
          padding: 23px 33px;
          background: #2d2d2d;
          border-radius: 15px;
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
        
      `}</style>
    </>
  )
}

export default ButtonCreateDirectory
