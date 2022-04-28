import { useState, useContext } from 'react'
import { CloudContext } from 'context/CloudContext'
import DropDown from 'components/icons/DropDown'

const OptionsMenu = ({ children }) => {
  const [open, setOpen] = useState(false)
  const { darkmode } = useContext(CloudContext)

  const handleOptionClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(!open)
  }

  const handleBlur = () => {
    setOpen(false)
  }

  return (
    <button onClick={handleOptionClick} onBlur={handleBlur} >
            <DropDown />
            {
                open &&
                <div className='options-menu'>
                    { children }
                </div>
            }

            <style jsx>{`
            
                button {
                  width: 27.5px;
                  height: 27.5px;
                  position: absolute;
                  right: 5px;
                  top: 10px;
                  padding: 3.5px 1.2px 0px 0px;
                  background: none;
                  border: 1px transparent solid;
                  outline: none;
                  cursor: pointer;
                  transition: all .5 ease;
                }

                button :global(svg) :global(path) {
                  fill: ${darkmode ? 'white' : 'black'}
                }

                button:hover :global(svg) :global(path) {
                  fill: #09f
                }

                button:hover {
                  border: 1px solid #09f;
                  border-radius: 50%;

                }

                .options-menu {
                    position: absolute;
                    display: flex;
                    top: 100%;
                    right: 100%;
                    flex-direction: column;
                    padding: 10px;
                    /* background-color: #343a40; */
                    background-color: ${darkmode ? '#292929' : 'white'};
                    color: ${darkmode ? 'white' : 'color'};;
                    border-radius: 10px 0 10px 10px;
                    box-shadow: rgb(0 0 0 / 50%) 5px 5px 12px 5px;
                    z-index: 10;
                    transform: translateX(12.5%);
                }

            `}</style>
        </button>
  )
}

export default OptionsMenu
