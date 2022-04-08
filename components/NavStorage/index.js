import Link from 'next/link'

export default function NavStorage ({ url = [] }) {
  let storageUrl = '/storage'
  return (
    <>
      <div className="container">
        <nav>
          <div className="element">
            <Link href="/storage">
              <a className="home-nav">
                🏠/
              </a>
            </Link>
          </div>
          {url.map((i, index) => {
            storageUrl += `/${i}`

            return (
              <div key={index} className="element">
                <span> {'>'} </span>
                <Link href={storageUrl}>
                  <a>
                    {i}
                  </a>
                </Link>
              </div>
            )
          })}
        </nav>
      </div>

      <style jsx>{`
        
        .container {
          padding: 50px 0;
        }

        .element {
          height: 100%;
          display: flex;
          align-items: center;
        }

        nav {
          margin: 0 auto;
          max-width: 1200px;
          height: 40px;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 0 15px;
          display: flex;
          overflow-x: auto;
        }

        nav::-webkit-scrollbar{
          width: 6px;
          height: 6px;
        }
        nav::-webkit-scrollbar-thumb{
          box-shadow: inset 0 0 6px rgba(0,0,0,.3);
          background-color: #737272;
          border-radius: 30px;
        }
        nav::-webkit-scrollbar-thumb:hover{
          background: #09f; 
        }
        nav::-webkit-scrollbar-track{
          background-color: #404040;
          border-radius: 30px;
          box-shadow: inset 0px 0px 0px 0px #F0F0F0;
        }
        
        span {
          margin: 0 10px
        }

        a:hover {
          color: #09f
        }

        @media(max-width: 1200px) {
          nav {
            max-width: 90%;
          }
        }
      `}</style>
    </>
  )
}
