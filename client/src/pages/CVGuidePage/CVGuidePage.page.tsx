import { memo, useState, useEffect } from 'react'
import { DocumentTextIcon, InformationCircleIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface TooltipData {
  title: string
  dos: string[]
  donts: string[]
  tips: string[]
}

const tooltips: Record<string, TooltipData> = {
  header: {
    title: "Nagłówek CV",
    dos: [
      "Użyj pełnego imienia i nazwiska",
      "Dodaj aktualny numer telefonu",
      "Podaj profesjonalny adres email",
      "Umieść link do LinkedIn i GitHub"
    ],
    donts: [
      "Nie dodawaj zdjęcia (chyba że wymagane)",
      "Nie używaj dziwnych fontów",
      "Nie podawaj adresu domowego",
      "Nie używaj emaili typu 'kochamjave@gmail.com'"
    ],
    tips: [
      "Email powinien zawierać imię i nazwisko",
      "LinkedIn URL można skrócić do linkedin.com/in/imienazwisko"
    ]
  },
  summary: {
    title: "Podsumowanie zawodowe",
    dos: [
      "Napisz 2-3 zdania o swoim doświadczeniu",
      "Podkreśl kluczowe umiejętności",
      "Dostosuj do konkretnej oferty pracy",
      "Użyj słów kluczowych z ogłoszenia"
    ],
    donts: [
      "Nie pisz więcej niż 4 zdania",
      "Nie używaj ogólników jak 'ambitny'",
      "Nie kopiuj tego samego tekstu wszędzie",
      "Nie pisz w pierwszej osobie"
    ],
    tips: [
      "Zacznij od lat doświadczenia lub poziomu",
      "Skończ celem zawodowym lub wartością dla firmy"
    ]
  },
  experience: {
    title: "Doświadczenie zawodowe",
    dos: [
      "Opisuj osiągnięcia, nie obowiązki",
      "Używaj liczb i konkretnych przykładów",
      "Wymień użyte technologie",
      "Podaj okres zatrudnienia (miesiąc/rok)"
    ],
    donts: [
      "Nie pisz 'Programowałem aplikacje'",
      "Nie wymieniaj wszystkich technologii",
      "Nie ukrywaj luk w CV",
      "Nie kłam w datach"
    ],
    tips: [
      "Format: 'Zbudowałem system X używając Y, co zwiększyło Z o 30%'",
      "Najnowsze doświadczenie na górze"
    ]
  },
  skills: {
    title: "Umiejętności techniczne",
    dos: [
      "Podziel na kategorie (Frontend, Backend, etc.)",
      "Podaj poziom zaawansowania",
      "Wymień najważniejsze technologie",
      "Dostosuj do oferty pracy"
    ],
    donts: [
      "Nie wymieniaj wszystkiego co znasz",
      "Nie kłam w poziomach",
      "Nie dodawaj przestarzałych technologii",
      "Nie używaj gwiazdek do oceny"
    ],
    tips: [
      "Użyj: Zaawansowany (3+ lata), Średniozaawansowany (1-3 lata), Podstawowy (<1 rok)",
      "Maksymalnie 15-20 technologii"
    ]
  },
  education: {
    title: "Wykształcenie",
    dos: [
      "Podaj nazwę uczelni i kierunek",
      "Dodaj lata studiów",
      "Wymień ważne projekty/specjalizacje",
      "Dodaj kursy i certyfikaty"
    ],
    donts: [
      "Nie podawaj ocen (chyba że bardzo dobre)",
      "Nie wymieniaj szkół podstawowych/średnich",
      "Nie dodawaj nieukończonych studiów bez wyjaśnienia",
      "Nie kłam w tytułach"
    ],
    tips: [
      "Jeśli jesteś samoukiem, podkreśl projekty i kursy",
      "Certyfikaty IT są często ważniejsze niż dyplom"
    ]
  },
  projects: {
    title: "Projekty",
    dos: [
      "Opisz 2-3 najlepsze projekty",
      "Podaj cel i rezultat projektu",
      "Wymień użyte technologie",
      "Dodaj linki do demo i kodu"
    ],
    donts: [
      "Nie dodawaj projektów z tutoriali",
      "Nie opisuj projektów bez kodu",
      "Nie ukrywaj że to projekt osobisty",
      "Nie dodawaj niedziałających linków"
    ],
    tips: [
      "Pokaż różnorodność umiejętności",
      "Opisz wyzwania i jak je rozwiązałeś"
    ]
  }
}

const CVSection = memo<{ 
  id: string
  title: string
  children: React.ReactNode
  onClick: () => void
  isActive: boolean
}>(({ title, children, onClick, isActive }) => (
  <div 
    className={`relative p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer
      ${isActive 
        ? 'border-java-orange bg-java-orange/10 shadow-lg' 
        : 'border-java-orange/30 hover:border-java-orange/60 hover:bg-java-orange/5 hover:shadow-md'
      }`}
    onClick={onClick}
  >
    <div className="absolute top-2 right-2">
      <InformationCircleIcon className="w-5 h-5 text-java-orange" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-java-dark-text mb-3">
      {title}
    </h3>
    {children}
  </div>
))

const Tooltip = memo<{ 
  data: TooltipData
  onClose: () => void
}>(({ data, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-java-orange/15 via-java-orange/10 to-java-orange/5 dark:from-java-orange/25 dark:via-java-orange/15 dark:to-java-orange/10 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-java-orange/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-java-orange/20 to-java-orange/10 dark:from-java-orange/30 dark:to-java-orange/20 border-b border-java-orange/40 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-java-dark-text">
            {data.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-java-orange/20 dark:hover:bg-java-orange/30 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-java-dark-text" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="w-5 h-5 text-green-700" />
              <h3 className="text-lg font-semibold text-green-700">Co robić</h3>
            </div>
            <ul className="space-y-2">
              {data.dos.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-java-dark-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-700" />
              <h3 className="text-lg font-semibold text-red-700">Czego nie robić</h3>
            </div>
            <ul className="space-y-2">
              {data.donts.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-700 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-java-dark-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-java-orange/20 rounded-lg p-4 border border-java-orange/30">
            <h3 className="text-lg font-semibold text-java-orange mb-3">💡 Dodatkowe wskazówki</h3>
            <ul className="space-y-2">
              {data.tips.map((tip, index) => (
                <li key={index} className="text-gray-800 dark:text-java-dark-text-secondary">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
})

export const CVGuidePage = memo(() => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleSectionClick = (sectionId: string) => {
    setActiveTooltip(sectionId)
  }

  const closeTooltip = () => {
    setActiveTooltip(null)
  }

  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-java-orange/20 via-java-orange/10 to-java-orange/5 dark:from-java-orange/30 dark:via-java-orange/20 dark:to-java-orange/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-java-orange/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-java-orange/15 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-java-orange/10 rounded-full mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <DocumentTextIcon className="w-10 h-10 text-java-orange" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-java-gray dark:text-java-dark-text mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.span 
                className="text-java-orange"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Poradnik
              </motion.span>{" "}
              <motion.span 
                className="text-java-blue"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                CV
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-java-blue leading-relaxed max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Kliknij w dowolną sekcję CV poniżej, aby dowiedzieć się jak ją poprawnie wypełnić
            </motion.p>
            
            <motion.div 
              className="bg-java-orange/15 border border-java-orange/30 rounded-lg p-4 inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <p className="text-java-orange font-semibold">
                💡 Kliknij w sekcje CV aby zobaczyć wskazówki
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Interactive CV */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-java-orange/20 via-java-orange/10 to-java-orange/5 dark:from-java-orange/30 dark:via-java-orange/20 dark:to-java-orange/10 shadow-2xl rounded-xl p-8 lg:p-12">
          
          {/* Header Section */}
          <CVSection
            id="header"
            title="Dane kontaktowe"
            onClick={() => handleSectionClick('header')}
            isActive={activeTooltip === 'header'}
          >
            <div className="text-center border-b border-java-orange/20 pb-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-java-orange to-java-blue mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  JK
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-java-dark-text mb-2">
                  Jan Kowalski
                </h1>
                <p className="text-xl text-java-orange mb-4">Senior Java Developer</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 dark:text-java-dark-text-secondary">
                <span>📧 jan.kowalski@email.com</span>
                <span>📱 +48 123 456 789</span>
                <span>💼 linkedin.com/in/jankowalski</span>
                <span>🔗 github.com/jankowalski</span>
              </div>
              <p className="text-sm text-java-orange/80 mt-3 italic">
                Kliknij aby dowiedzieć się jak poprawnie uzupełnić dane kontaktowe
              </p>
            </div>
          </CVSection>

          {/* Summary Section */}
          <CVSection
            id="summary"
            title="Podsumowanie zawodowe"
            onClick={() => handleSectionClick('summary')}
            isActive={activeTooltip === 'summary'}
          >
            <div className="py-6 border-b border-java-orange/20">
              <p className="text-gray-800 dark:text-java-dark-text-secondary leading-relaxed">
                Doświadczony Java Developer z 5-letnim stażem w tworzeniu aplikacji enterprise. 
                Specjalizuję się w Spring Boot, mikrousługach i architekturze chmurowej. 
                Szukam możliwości rozwoju w zespole pracującym nad innowacyjnymi rozwiązaniami fintech.
              </p>
              <p className="text-sm text-java-orange/80 mt-3 italic">
                Kliknij aby dowiedzieć się jak napisać skuteczne podsumowanie
              </p>
            </div>
          </CVSection>

          {/* Experience Section */}
          <CVSection
            id="experience"
            title="Doświadczenie zawodowe"
            onClick={() => handleSectionClick('experience')}
            isActive={activeTooltip === 'experience'}
          >
            <div className="py-6 border-b border-java-orange/20 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-java-dark-text">
                    Senior Java Developer
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-java-dark-text-secondary">03/2021 - obecnie</span>
                </div>
                <p className="text-java-orange font-medium mb-2">TechCorp Sp. z o.o.</p>
                <ul className="text-gray-800 dark:text-java-dark-text-secondary space-y-1 text-sm">
                  <li>• Zbudowałem system płatności obsługujący 50k transakcji dziennie używając Spring Boot i PostgreSQL</li>
                  <li>• Zoptymalizowałem zapytania bazodanowe, redukując czas odpowiedzi o 60%</li>
                  <li>• Wdrożyłem CI/CD pipeline z Jenkins, skracając czas deploymentu z 2h do 15min</li>
                </ul>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-java-dark-text">
                    Java Developer
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-java-dark-text-secondary">06/2019 - 02/2021</span>
                </div>
                <p className="text-java-orange font-medium mb-2">StartupXYZ</p>
                <ul className="text-gray-800 dark:text-java-dark-text-secondary space-y-1 text-sm">
                  <li>• Rozwijałem aplikację e-commerce w Spring MVC obsługującą 10k użytkowników</li>
                  <li>• Implementowałem REST API z dokumentacją Swagger</li>
                  <li>• Współpracowałem z zespołem frontend w metodologii Scrum</li>
                </ul>
              </div>
              <p className="text-sm text-java-orange/80 mt-4 italic">
                Kliknij aby dowiedzieć się jak opisywać doświadczenie zawodowe
              </p>
            </div>
          </CVSection>

          {/* Skills Section */}
          <CVSection
            id="skills"
            title="Umiejętności techniczne"
            onClick={() => handleSectionClick('skills')}
            isActive={activeTooltip === 'skills'}
          >
            <div className="py-6 border-b border-java-orange/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-java-dark-text mb-3">Backend</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-java-dark-text-secondary">Java</span>
                      <span className="text-java-orange">Zaawansowany (5 lat)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-java-dark-text-secondary">Spring Boot</span>
                      <span className="text-java-orange">Zaawansowany (4 lata)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-java-dark-text-secondary">PostgreSQL</span>
                      <span className="text-java-orange">Średniozaawansowany (3 lata)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-java-dark-text mb-3">DevOps & Narzędzia</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-java-dark-text-secondary">Docker</span>
                      <span className="text-java-orange">Średniozaawansowany (2 lata)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-java-dark-text-secondary">AWS</span>
                      <span className="text-java-orange">Podstawowy (1 rok)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-java-dark-text-secondary">Git</span>
                      <span className="text-java-orange">Zaawansowany (5 lat)</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-java-orange/80 mt-4 italic">
                Kliknij aby dowiedzieć się jak prezentować umiejętności techniczne
              </p>
            </div>
          </CVSection>

          {/* Projects Section */}
          <CVSection
            id="projects"
            title="Projekty"
            onClick={() => handleSectionClick('projects')}
            isActive={activeTooltip === 'projects'}
          >
            <div className="py-6 border-b border-java-orange/20 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-java-dark-text mb-2">
                  TaskManager Pro
                </h4>
                <p className="text-gray-800 dark:text-java-dark-text-secondary text-sm mb-2">
                  Aplikacja do zarządzania projektami z real-time collaboration. 
                  Technologie: Spring Boot, WebSocket, React, PostgreSQL
                </p>
                <div className="flex gap-4 text-xs">
                  <span className="text-java-orange">🔗 github.com/jan/taskmanager</span>
                  <span className="text-java-orange">🌐 taskmanager-demo.com</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-java-dark-text mb-2">
                  CryptoTracker API
                </h4>
                <p className="text-gray-800 dark:text-java-dark-text-secondary text-sm mb-2">
                  REST API do śledzenia kursów kryptowalut z cache'owaniem Redis. 
                  Technologie: Spring Boot, Redis, Docker, Swagger
                </p>
                <div className="flex gap-4 text-xs">
                  <span className="text-java-orange">🔗 github.com/jan/cryptotracker</span>
                </div>
              </div>
              <p className="text-sm text-java-orange/80 mt-4 italic">
                Kliknij aby dowiedzieć się jak prezentować projekty
              </p>
            </div>
          </CVSection>

          {/* Education Section */}
          <CVSection
            id="education"
            title="Wykształcenie"
            onClick={() => handleSectionClick('education')}
            isActive={activeTooltip === 'education'}
          >
            <div className="py-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-java-dark-text">
                      Informatyka, Inżynier
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-java-dark-text-secondary">2015 - 2019</span>
                  </div>
                  <p className="text-java-orange font-medium text-sm">Politechnika Warszawska</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-java-dark-text mb-2">
                    Certyfikaty
                  </h4>
                  <ul className="text-gray-800 dark:text-java-dark-text-secondary text-sm space-y-1">
                    <li>• Oracle Certified Professional: Java SE 11 Developer (2022)</li>
                    <li>• AWS Certified Developer Associate (2023)</li>
                    <li>• Spring Professional Certification (2021)</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-java-orange/80 mt-4 italic">
                Kliknij aby dowiedzieć się jak prezentować wykształcenie
              </p>
            </div>
          </CVSection>
        </div>
      </div>

      {/* Tooltip Modal */}
      {activeTooltip && tooltips[activeTooltip] && (
        <Tooltip 
          data={tooltips[activeTooltip]} 
          onClose={closeTooltip}
        />
      )}
    </div>
  )
})

CVGuidePage.displayName = 'CVGuidePage'