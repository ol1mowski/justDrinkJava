import { memo, useState } from 'react'
import { Input } from '../../../components/ui/Input/Input.component'
import { Button } from '../../../components/ui/Button/Button.component'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useChangePassword } from '../hooks/useChangePassword.hook'

export const SecuritySection = memo(() => {
  const { isLoading, error, success, changePassword, clearState } = useChangePassword()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) return

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword
      })
      
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Błąd podczas zmiany hasła:', error)
    }
  }

  const handleClearError = () => {
    clearState()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-java-blue/10 rounded-lg">
          <LockClosedIcon className="w-5 h-5 text-java-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Bezpieczeństwo</h2>
          <p className="text-sm text-gray-600">Zarządzaj hasłem i bezpieczeństwem konta</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={handleClearError} className="text-red-500 hover:text-red-700">
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Hasło zostało zmienione pomyślnie
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Aktualne hasło"
            type="password"
            placeholder="Wprowadź aktualne hasło"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            isPassword
            showPasswordToggle
          />
          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nowe hasło"
            type="password"
            placeholder="Wprowadź nowe hasło"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isPassword
            showPasswordToggle
            helperText="Minimum 8 znaków"
          />
          <Input
            label="Potwierdź nowe hasło"
            type="password"
            placeholder="Potwierdź nowe hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isPassword
            showPasswordToggle
            error={confirmPassword && newPassword !== confirmPassword ? 'Hasła nie są identyczne' : undefined}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            variant="primary"
            onClick={handleChangePassword}
            isLoading={isLoading}
            disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
          >
            Zmień hasło
          </Button>
        </div>
      </div>
    </div>
  )
})

SecuritySection.displayName = 'SecuritySection' 