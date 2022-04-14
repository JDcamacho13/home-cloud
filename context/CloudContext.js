import { createContext, useReducer } from 'react'
import { cloudReducer, initialState } from '../reducers/cloudReducer'

export const CloudContext = createContext()

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cloudReducer, initialState)

  return <CloudContext.Provider value={{ state, dispatch }}>{children}</CloudContext.Provider>
}
