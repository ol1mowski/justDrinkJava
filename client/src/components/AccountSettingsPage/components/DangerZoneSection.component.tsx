import { memo, useState } from 'react'
import { Button } from '../../../components/ui/Button/Button.component'
import { Input } from '../../../components/ui/Input/Input.component'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDeleteAccount } from '../hooks/useDeleteAccount.hook'

export const DangerZoneSection = memo(() => {
  const { isLoading, error, deleteAccount, clearState } = useDeleteAccount()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [confirmation, setConfirmation] = useState('')

  const handleDeleteAccount = async () => {
    if (confirmation !== 'USUŃ KONTO') return

    try {
      await deleteAccount({ confirmation })
    } catch (error) {
      console.error('Błąd podczas usuwania konta:', error)
    }
  }

  const handleCancel = () => {
    setShowDeleteConfirmation(false)
    setConfirmation('')
    clearState()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Strefa niebezpieczna</h2>
          <p className="text-sm text-gray-600">Nieodwracalne działania na koncie</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Usuń konto
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Po usunięciu konta wszystkie Twoje dane zostaną trwale usunięte. 
                Ta operacja jest nieodwracalna.
              </p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}
              
              {!showDeleteConfirmation ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Usuń konto
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white border border-red-300 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Aby potwierdzić usunięcie konta, wpisz <strong>USUŃ KONTO</strong> poniżej:
                    </p>
                    <Input
                      placeholder="USUŃ KONTO"
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex gap-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDeleteAccount}
                        isLoading={isLoading}
                        disabled={confirmation !== 'USUŃ KONTO'}
                      >
                        Potwierdź usunięcie
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Anuluj
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

DangerZoneSection.displayName = 'DangerZoneSection' 