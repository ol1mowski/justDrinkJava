import { memo } from 'react'
import { useAuthStatus } from '../../../hooks/useAuthStatus.hook'

const careerTips = [
  {
    id: 1,
    title: "Zbuduj solidne portfolio projektów",
    description: "Stwórz 3-5 projektów demonstrujących różne technologie. Umieść je na GitHub i hostuj online.",
    icon: "🚀"
  },
  {
    id: 2,
    title: "Naucz się podstaw algorytmów i struktur danych",
    description: "Praktykuj zadania na LeetCode, HackerRank czy Codewars. To podstawa większości rozmów technicznych.",
    icon: "🧠"
  },
  {
    id: 3,
    title: "Przygotuj się do rozmów behawioralnych",
    description: "Przygotuj przykłady sytuacji używając metody STAR (Situation, Task, Action, Result).",
    icon: "💬"
  },
  {
    id: 4,
    title: "Stwórz profesjonalny profil LinkedIn",
    description: "Optymalizuj profil pod kątem rekruterów. Dodaj zdjęcie, opis, umiejętności i rekomendacje.",
    icon: "👔"
  },
  {
    id: 5,
    title: "Ucz się technologii używanych w firmach",
    description: "Sprawdź oferty pracy i naucz się najpopularniejszych technologii w Twojej branży.",
    icon: "💻"
  },
  {
    id: 6,
    title: "Bierz udział w projektach open source",
    description: "Przyczyniaj się do projektów open source - to świetny sposób na zdobycie doświadczenia.",
    icon: "🌟"
  },
  {
    id: 7,
    title: "Networking i społeczność IT",
    description: "Uczesticz w meetupach, konferencjach i wydarzeniach IT. Buduj relacje w branży.",
    icon: "🤝"
  },
  {
    id: 8,
    title: "Przygotuj się do zadań praktycznych",
    description: "Ćwicz live coding, pair programming i rozwiązywanie problemów pod presją czasu.",
    icon: "⚡"
  },
  {
    id: 9,
    title: "Zdobądź certyfikaty branżowe",
    description: "Zdobądź certyfikaty AWS, Azure, Google Cloud lub inne releventne dla Twojej ścieżki.",
    icon: "🏆"
  },
  {
    id: 10,
    title: "Nie poddawaj się po odrzuceniu",
    description: "Każde 'nie' przybliża Cię do 'tak'. Ucz się na błędach i aplikuj dalej!",
    icon: "💪"
  }
]

export const CVCareerTipsSection = memo(() => {
  const { isAuthenticated, user, isLoading } = useAuthStatus()

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Sprawdzanie statusu logowania...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ☕ Jak dostać pracę w IT?
        </h2>
        <p className="text-lg text-gray-600">
          10 sprawdzonych porad od doświadczonych programistów
        </p>
      </div>

      {isAuthenticated ? (
        <>
          <div className="space-y-8">
            {careerTips.map((tip, index) => (
              <div 
                key={tip.id}
                className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-java-orange hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-java-orange text-white text-sm font-bold px-3 py-1 rounded-full">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">
                        {tip.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-gradient-to-r from-java-blue to-java-orange rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Witaj {user?.username}! Gotowy na swoją karierę w IT? ☕
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Pamiętaj: każdy ekspert był kiedyś początkującym. Kluczem jest konsekwencja i ciągłe uczenie się!
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => window.location.href = '/quizzes'}
                className="bg-white text-java-blue font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sprawdź swoją wiedzę 🧪
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-java-orange/20 text-white font-bold py-3 px-6 rounded-lg hover:bg-java-orange/30 transition-colors border border-white/30"
              >
                Wróć do głównej ☕
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          <div className="blur-sm pointer-events-none">
            <div className="space-y-8">
              {careerTips.slice(0, 3).map((tip, index) => (
                <div 
                  key={tip.id}
                  className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-java-orange"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{tip.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-java-orange text-white text-sm font-bold px-3 py-1 rounded-full">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800">
                          {tip.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay z komunikatem o logowaniu */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg">
            <div className="text-center p-8 max-w-md">
              <div className="text-6xl mb-6">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Więcej porad czeka na Ciebie!
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Aby zobaczyć więcej porad musisz się zalogować
              </p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="bg-java-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-java-orange/90 transition-colors"
                >
                  Zaloguj się ☕
                </button>
                <button 
                  onClick={() => window.location.href = '/register'}
                  className="bg-java-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-java-blue/90 transition-colors"
                >
                  Zarejestruj się 🚀
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Co zyskasz po zalogowaniu?</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>✅ 10 sprawdzonych porad karrierowych</li>
                  <li>✅ Dostęp do wszystkich quizów</li>
                  <li>✅ Personalizowane rekomendacje</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

CVCareerTipsSection.displayName = 'CVCareerTipsSection' 