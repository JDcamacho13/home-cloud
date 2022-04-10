const ButtonCloud = ({ onClick, title, icon, inputFile }) => {
  return (
    <>
      { inputFile &&
        inputFile
      }
      <button onClick={onClick}>
        <div className="create-dir">
          { icon }
          { title }
        </div>
      </button>

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          font-size: 21px;
          gap: 25px;
        }

        .create-dir > :global(svg) {
          margin: -5px 0;
        }

        .create-dir > :global(.file) :global(svg) :global(path) {
          transition: fill .5s ease;
        }

        button:hover .create-dir > :global(.file) :global(svg) :global(path) {
          fill: #09f;
        }

        button {
          width: 100%;
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

export default ButtonCloud
