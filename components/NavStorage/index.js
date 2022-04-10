import Link from 'next/link'
import { Home } from '../icons/Home'

export default function NavStorage ({ url = [] }) {
  let storageUrl = '/storage'
  return (
    <>
      <header className='header'>
        <nav className='nav'>
          <div className="element">
            <Link href="/storage">
              <a className="home-nav">
                <Home /><span className='bar'>/</span>
              </a>
            </Link>
          </div>
          {url.map((i, index) => {
            storageUrl += `/${i}`

            return (
              <div key={index} className="element">
                { index !== 0 &&
                  <span className='bar'> {'/'} </span>
                }
                <Link href={storageUrl}>
                  <a>
                    {i}
                  </a>
                </Link>
              </div>
            )
          })}
        </nav>
      </header>

      <style jsx>{`

        .header {
          margin: 0 auto;
          padding: 25px 0;
          width: 100%;
        }

        .nav {
          display: flex;
          margin: 0 auto;
          padding: 0 15px;
          width: 100%;
          height: 40px;
          border: 1px solid #eee;
          border-radius: 10px;
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
        
        .element {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .home-nav {
          display: flex;
          align-items: center;
        }

        .bar {
          line-height: 16px;
          margin: 0 10px
        }

        a:hover {
          color: #09f
        }

        @media (min-width: 768px) {
          .header {
            padding: 50px 25px 25px 25px;
          }
        }

      `}</style>
    </>
  )
}
