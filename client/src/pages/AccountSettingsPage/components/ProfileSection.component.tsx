import { memo } from 'react'
import { Input } from '../../../components/ui/Input/Input.component'
import { Button } from '../../../components/ui/Button/Button.component'
import { UserIcon } from '@heroicons/react/24/outline'

export const ProfileSection = memo(() => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-java-orange/10 rounded-lg">
          <UserIcon className="w-5 h-5 text-java-orange" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profil</h2>
          <p className="text-sm text-gray-600">Zarządzaj informacjami o swoim profilu</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nazwa użytkownika"
            placeholder="Wprowadź nową nazwę użytkownika"
            defaultValue="java_developer"
          />
          <Input
            label="Email"
            type="email"
            placeholder="twoj@email.pl"
            defaultValue="user@example.com"
            disabled
            helperText="Email nie może być zmieniony"
          />
        </div>

        <div className="flex justify-end">
          <Button variant="primary">
            Zapisz zmiany
          </Button>
        </div>
      </div>
    </div>
  )
})

ProfileSection.displayName = 'ProfileSection' 