import { createContext, useState } from 'react'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const toggleModal = (newValue) => {
    if (!newValue) {
      setIsModalOpen(newValue)
      setModalContent(null)
    } else {
      setIsModalOpen(newValue)
    }
  }

  return <Context.Provider value={{ isModalOpen, toggleModal, modalContent, setModalContent }}>{children}</Context.Provider>
}
