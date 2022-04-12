const Modal = ({ children, setVisible, uploading }) => {
  const handleClick = (e) => {
    if (e.target.id === 'container' && !uploading) {
      setVisible(prev => !prev)
    }
  }

  return (
    <>
      <div id="container" className="container" onClick={handleClick}>
        <div className="modal">
          {children}
        </div>
      </div>

      <style jsx>{`

        .container {
          z-index: 100;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0 ,0 ,.25);
        }

        .modal {
          padding: 10px;
          width: 600px;
          max-width: 85%;
          height: 325px;
          background: #fff;
          color: #242424;
          border-radius: 15px;
        }
      `}</style>

    </>
  )
}

export default Modal
