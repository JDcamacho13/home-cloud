import { createContext, useReducer, useMemo } from 'react'
import { cloudReducer, initialState } from '../reducers/cloudReducer'

export const CloudContext = createContext()
export const DispatchContext = createContext()

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cloudReducer, initialState)


  return (
    <DispatchContext.Provider value={dispatch}>
      <CloudContext.Provider value={state}>
        {children}
      </CloudContext.Provider>
    </DispatchContext.Provider>
  )
}
