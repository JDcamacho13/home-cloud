import { useContext } from 'react'
import { CloudContext } from 'context/CloudContext'
import { Home } from '../icons/Home'
import Link from 'next/link'
import ThemeMode from '../ThemeMode'

export default function NavStorage ({ url = [] }) {
  const { darkmode } = useContext(CloudContext)
  let storageUrl = '/storage'
  return (
    <>
      <header className='header'>
        <div className='container-theme-mode'>
          <ThemeMode />
        </div>
        <nav className='nav'>
          <div className="element">
            <Link href="/storage">
              <a className="home-nav">
                <Home width={30} heigth={30} />
              </a>
            </Link>
            <span className='bar'>/</span>
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

        .container-theme-mode {
          display: flex;
          margin-bottom: 25px;
          justify-content: flex-end
        }

        .header {
          margin: 0 auto;
          padding: 25px 0;
          width: 100%;
          max-width: calc(100vw - 50px)
        }

        .nav {
          display: flex;
          margin: 0 auto;
          padding: 0 15px;
          width: 100%;
          height: 55px;
          border: 1px solid ${darkmode ? '#eee' : '#000'};
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
          font-size: 18px;
        }

        .home-nav {
          display: flex;
          align-items: center;
          transition: all .5s ease;
        }

        .home-nav :global(svg) :global(path) {
          fill: ${darkmode ? 'white' : '#000'};
        }

        .home-nav:hover :global(svg) :global(path) {
          fill: #09f;
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
            padding: 25px 0px 50px 0px;
          }
        }

      `}</style>
    </>
  )
}
