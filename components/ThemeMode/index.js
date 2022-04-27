
import { useContext } from 'react'
import { TOGGLE_THEME_MODE } from 'actionTypes/cloudTypes'
import { CloudContext } from 'context/CloudContext'
import SwitchButton from 'components/Switch'

export default function ThemeMode () {
  const { state, dispatch } = useContext(CloudContext)

  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME_MODE })
  }

  return (
    <>
    <div>
      <p>{!state.darkmode ? 'Modo Claro' : 'Modo Oscuro'}</p> <SwitchButton state={state.darkmode} toggle={toggleTheme} />
    </div>

    <style jsx>{`
      div {
        display: flex;
        justify-content: space-between;
        gap: 15px;
      }

      p {
        display: inline;
        margin: 0 ;
      }
    `}</style>
    </>
  )
}
