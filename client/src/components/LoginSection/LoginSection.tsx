import React, { memo, useState, useCallback } from 'react'
import { LoginModal } from './components/LoginModal.component'

interface LoginSectionProps {
  triggerElement?: React.ReactElement<{ onClick?: () => void }>
}

export const LoginSection = memo<LoginSectionProps>(({ triggerElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      {triggerElement && 
        React.cloneElement(triggerElement, { onClick: openModal })
      }
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
})

LoginSection.displayName = 'LoginSection' 