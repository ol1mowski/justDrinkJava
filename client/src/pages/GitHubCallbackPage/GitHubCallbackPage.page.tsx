import { memo, useEffect, useState } from 'react'
import { useAuthWithGitHub } from '../../components/Auth/hooks/useAuthWithGitHub.hook'

export const GitHubCallbackPage = memo(() => {
  const { handleGitHubCallback } = useAuthWithGitHub() as any
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        const errorParam = urlParams.get('error')
        
        console.log('🔍 GitHub callback otrzymał:', { 
          url: window.location.href,
          code: code ? code.substring(0, 10) + '...' : null, 
          state, 
          error: errorParam 
        })

        if (errorParam) {
          throw new Error(`GitHub OAuth Error: ${errorParam}`)
        }

        if (!code || !state) {
          throw new Error('Brak wymaganych parametrów OAuth')
        }

        await handleGitHubCallback(code, state)
      } catch (err) {
        console.error('Błąd GitHub callback:', err)
        setError(err instanceof Error ? err.message : 'Nieoczekiwany błąd')
      }
    }

    processCallback()
  }, [handleGitHubCallback])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Błąd logowania
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-blue-500 text-6xl mb-4">
          <div className="animate-spin">⚙️</div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Przetwarzanie logowania...
        </h1>
        <p className="text-gray-600">
          Proszę czekać, trwa finalizacja procesu logowania przez GitHub.
        </p>
      </div>
    </div>
  )
})

GitHubCallbackPage.displayName = 'GitHubCallbackPage' 