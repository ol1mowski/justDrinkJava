import { memo } from 'react'
import { Input } from '../../../components/ui/Input/Input.component'
import { Button } from '../../../components/ui/Button/Button.component'
import { LockClosedIcon } from '@heroicons/react/24/outline'

export const SecuritySection = memo(() => {
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

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Aktualne hasło"
            type="password"
            placeholder="Wprowadź aktualne hasło"
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
            isPassword
            showPasswordToggle
            helperText="Minimum 8 znaków"
          />
          <Input
            label="Potwierdź nowe hasło"
            type="password"
            placeholder="Potwierdź nowe hasło"
            isPassword
            showPasswordToggle
          />
        </div>

        <div className="flex justify-end">
          <Button variant="primary">
            Zmień hasło
          </Button>
        </div>
      </div>
    </div>
  )
})

SecuritySection.displayName = 'SecuritySection' 