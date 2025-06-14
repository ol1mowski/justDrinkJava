import { memo } from 'react'
import { DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline'

const CVTip = memo<{ icon: React.ReactNode; title: string; description: string; type?: 'success' | 'warning' | 'info' }>(
  ({ icon, title, description, type = 'info' }) => {
    const bgColor = {
      success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }[type]

    const iconColor = {
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400'
    }[type]

    return (
      <div className={`p-6 rounded-xl border ${bgColor} transition-all duration-200 hover:shadow-md`}>
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 ${iconColor}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-java-gray dark:text-java-dark-text mb-2">
              {title}
            </h3>
            <p className="text-java-blue/90 dark:text-java-dark-text-secondary leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    )
  }
)

const CVSection = memo<{ title: string; children: React.ReactNode }>(({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-java-gray dark:text-java-dark-text mb-8 text-center">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </section>
))

export const CVGuidePage = memo(() => {
  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-java-orange/10 via-java-white to-java-blue/10 dark:from-java-orange/5 dark:via-java-dark-bg dark:to-java-blue/5 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-java-orange/20 dark:bg-java-orange/30 rounded-full mb-6">
            <DocumentTextIcon className="w-8 h-8 text-java-orange" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-java-gray dark:text-java-dark-text mb-6">
            Poradnik CV dla Programistów
          </h1>
          <p className="text-xl text-java-blue/90 dark:text-java-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            Kompletny przewodnik po tworzeniu profesjonalnego CV, które wyróżni Cię na rynku IT. 
            Praktyczne wskazówki, przykłady i najczęstsze błędy do uniknięcia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Podstawy CV */}
        <CVSection title="Podstawy Dobrego CV">
          <CVTip
            icon={<CheckCircleIcon className="w-6 h-6" />}
            title="Struktura i Czytelność"
            description="Używaj jasnej struktury z wyraźnymi sekcjami. Maksymalnie 2 strony A4. Wybierz profesjonalną czcionkę jak Arial, Calibri lub Open Sans w rozmiarze 10-12pt."
            type="success"
          />
          <CVTip
            icon={<LightBulbIcon className="w-6 h-6" />}
            title="Dane Kontaktowe"
            description="Umieść imię, nazwisko, numer telefonu, email i LinkedIn na górze. Dodaj link do GitHub i portfolio. Unikaj zdjęć, chyba że są wymagane."
            type="info"
          />
          <CVTip
            icon={<CheckCircleIcon className="w-6 h-6" />}
            title="Podsumowanie Zawodowe"
            description="Napisz 2-3 zdania o swoim doświadczeniu, kluczowych umiejętnościach i celach zawodowych. To pierwsza rzecz, którą zobaczy rekruter."
            type="success"
          />
          <CVTip
            icon={<LightBulbIcon className="w-6 h-6" />}
            title="Słowa Kluczowe"
            description="Dostosuj CV do konkretnej oferty pracy. Używaj słów kluczowych z ogłoszenia, szczególnie nazw technologii i metodologii."
            type="info"
          />
        </CVSection>

        {/* Sekcja Techniczna */}
        <CVSection title="Umiejętności Techniczne">
          <CVTip
            icon={<CheckCircleIcon className="w-6 h-6" />}
            title="Języki Programowania"
            description="Wymień języki w kolejności od najlepiej znanych. Dodaj poziom zaawansowania (np. zaawansowany, średniozaawansowany, podstawowy) lub lata doświadczenia."
            type="success"
          />
          <CVTip
            icon={<LightBulbIcon className="w-6 h-6" />}
            title="Technologie i Narzędzia"
            description="Podziel na kategorie: Frontend, Backend, Bazy danych, DevOps, Narzędzia. Nie wymieniaj wszystkiego - skup się na najważniejszych."
            type="info"
          />
          <CVTip
            icon={<CheckCircleIcon className="w-6 h-6" />}
            title="Certyfikaty i Kursy"
            description="Wymień aktualne certyfikaty (AWS, Azure, Google Cloud) i ukończone kursy online. Dodaj daty i nazwy platform (Coursera, Udemy, Pluralsight)."
            type="success"
          />
          <CVTip
            icon={<LightBulbIcon className="w-6 h-6" />}
            title="Projekty Osobiste"
            description="Opisz 2-3 najlepsze projekty. Dla każdego podaj: cel, użyte technologie, link do repozytorium i demo. Pokaż różnorodność umiejętności."
            type="info"
          />
        </CVSection>

        {/* Doświadczenie Zawodowe */}
        <CVSection title="Doświadczenie Zawodowe">
          <CVTip
            icon={<CheckCircleIcon className="w-6 h-6" />}
            title="Format Opisów"
            description="Dla każdej pozycji: stanowisko, firma, okres, lokalizacja. Opisuj osiągnięcia, nie obowiązki. Używaj liczb i konkretnych przykładów."
            type="success"
          />
          <CVTip
            icon={<LightBulbIcon className="w-6 h-6" />}
            title="Osiągnięcia vs Obowiązki"
            description="Zamiast 'Programowałem aplikacje' napisz 'Zbudowałem aplikację e-commerce obsługującą 10k użytkowników dziennie, co zwiększyło sprzedaż o 25%'."
            type="info"
          />
          <CVTip
            icon={<CheckCircleIcon className="w-6 h-6" />}
            title="Technologie w Kontekście"
            description="Nie wymieniaj tylko technologii, ale opisz jak je wykorzystałeś: 'Zoptymalizowałem zapytania SQL, redukując czas ładowania o 40%'."
            type="success"
          />
          <CVTip
            icon={<LightBulbIcon className="w-6 h-6" />}
            title="Luki w CV"
            description="Jeśli masz przerwy w pracy, wyjaśnij je krótko: nauka, projekty osobiste, freelancing. Bądź szczery, ale pozytywny."
            type="info"
          />
        </CVSection>

        {/* Najczęstsze Błędy */}
        <CVSection title="Najczęstsze Błędy">
          <CVTip
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            title="Zbyt Długie CV"
            description="CV powyżej 2 stron rzadko jest czytane w całości. Skup się na najważniejszych informacjach z ostatnich 5-7 lat."
            type="warning"
          />
          <CVTip
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            title="Błędy Językowe"
            description="Sprawdź ortografię i gramatykę. Poproś kogoś o przeczytanie. Błędy językowe mogą dyskwalifikować nawet najlepszego kandydata."
            type="warning"
          />
          <CVTip
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            title="Ogólnikowe Opisy"
            description="Unikaj frazesów jak 'dobra znajomość', 'podstawy'. Bądź konkretny: 'React (3 lata), Redux, Hooks, TypeScript'."
            type="warning"
          />
          <CVTip
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            title="Nieaktualne Informacje"
            description="Usuń przestarzałe technologie (Flash, jQuery w 2024). Aktualizuj CV regularnie, nawet jeśli nie szukasz pracy."
            type="warning"
          />
        </CVSection>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-java-orange to-java-blue rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Gotowy na Następny Krok?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Zastosuj te wskazówki i stwórz CV, które otworzy Ci drzwi do wymarzonej pracy w IT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-java-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Pobierz Szablon CV
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-java-orange transition-colors duration-200">
              Zobacz Przykłady
            </button>
          </div>
        </section>
      </div>
    </div>
  )
})

CVGuidePage.displayName = 'CVGuidePage' 