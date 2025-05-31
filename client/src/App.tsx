import Header from './components/Header/Header'
import { useTheme } from './hooks/useTheme.hooks'
import { useLanguage } from './hooks/useLanguage.hooks'
// import { useTranslations } from './translations'

function App() {
  const { isDark } = useTheme()
  const { currentLanguage } = useLanguage()
  // const t = useTranslations(currentLanguage)

  return (
    <div className="min-h-screen bg-java-light-gray dark:bg-java-dark-bg 
                   text-java-gray dark:text-java-dark-text transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-java-gray dark:text-java-dark-text mb-4">
            Witaj w JustDrinkJava!
          </h1>
          <p className="text-lg text-java-gray/70 dark:text-java-dark-text-secondary mb-8">
            Twoje źródło wiedzy o programowaniu w Javie
          </p>
          <div className="bg-java-white dark:bg-java-dark-surface rounded-lg shadow-lg p-8
                         border border-java-gray/10 dark:border-java-dark-text/10">
            <p className="text-java-gray dark:text-java-dark-text mb-4">
              ✅ Header został utworzony z nowymi features! 🎉
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-java-orange font-semibold">🌙 Dark/Light/System Mode</p>
              <p className="text-java-orange font-semibold">🌍 Multi-language (PL/EN/DE)</p>
              <p className="text-java-gray/70 dark:text-java-dark-text-secondary">
                Tryb: {isDark ? 'Ciemny' : 'Jasny'} | Język: {currentLanguage.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
