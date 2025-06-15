import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthSection } from '../../../components/LoginSection/AuthSection.component'

export const LoginFormSection = memo(() => {
  const navigate = useNavigate()

  const handleAuthSuccess = () => {
    navigate('/')
  }

  return (
    <AuthSection onAuthSuccess={handleAuthSuccess} />
  )
})

LoginFormSection.displayName = 'LoginFormSection' 