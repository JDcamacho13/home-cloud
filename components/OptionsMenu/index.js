import { useState } from 'react'
import DropDown from 'components/icons/DropDown'

const OptionsMenu = ({ children }) => {
  const [open, setOpen] = useState(false)
  const handleOptionClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(!open)
  }

  const handleBlur = () => {
    setOpen(false)
  }

  return (
    <button onClick={handleOptionClick} onBlur={handleBlur}>
            <DropDown />
            {
                open &&
                <div className='options-menu'>
                    { children }
                </div>
            }

            <style jsx>{`
            
                button {
                    position: absolute;
                    right: 5px;
                    top: 10px;
                    padding: 5px;
                    background: none;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }

                .options-menu {
                    position: absolute;
                    display: flex;
                    top: 100%;
                    right: 100%;
                    flex-direction: column;
                    padding: 10px;
                    background-color: #343a40;
                    border-radius: 10px 0 10px 10px;
                    box-shadow: rgb(0 0 0 / 40%) 5px 5px 12px 0px;
                    z-index: 10;
                    transform: translateX(12.5%);
                }

            `}</style>
        </button>
  )
}

export default OptionsMenu
