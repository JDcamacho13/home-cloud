const Modal = ({ children, visible, setVisible, uploading }) => {
  const handleCilck = (e) => {
    if (e.target.id === 'container' && !uploading)setVisible(!visible)
  }

  return (
    <>
      <div id="container" className="container" onClick={handleCilck} >
        <div className="modal">
          {children}
        </div>
      </div>

      <style jsx>{`

        .container {
          width: 100%;
          height: 100%;
          min-height: 100vh;
          position: absolute;
          background: rgba(0, 0 ,0 ,.24);
          top: 0;
          display: ${visible ? 'flex' : 'none'};
          place-content: center;
        }

        .modal {
          max-width: 85%;
          width: 600px;
          height: 325px;
          top: calc(50vh - 200px);
          position: absolute;
          background: #fff;
          color: #242424;
          border-radius: 15px;
        }
      `}</style>

    </>
  )
}

export default Modal
