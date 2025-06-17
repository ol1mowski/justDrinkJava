import { memo } from 'react'
import { motion } from 'framer-motion'
import { JobCard } from './JobCard.component'

const jobBoardsData = [
  {
    rank: 1,
    name: 'LinkedIn',
    description: 'Największa profesjonalna sieć społecznościowa na świecie. Świetne możliwości networkingu i bezpośredni kontakt z rekruterami. Doskonała jakość ofert pracy w Java.',
    rating: 4.8,
    userCount: '900M+',
    verified: true,
    pros: [
      'Najwięcej ofert pracy Java',
      'Bezpośredni kontakt z rekruterami',
      'Świetny networking',
      'Premium insights o firmach'
    ],
    cons: [
      'Duża konkurencja',
      'Premium funkcje są płatne',
      'Czasem spam od rekruterów'
    ],
    url: 'https://linkedin.com'
  },
  {
    rank: 2,
    name: 'NoFluffJobs',
    description: 'Polska platforma skoncentrowana na IT. Transparentne widełki płacowe, szczegółowe opisy technologii i brak ofert bez konkretów. Idealna dla programistów Java w Polsce.',
    rating: 4.6,
    userCount: '500K+',
    verified: true,
    pros: [
      'Widoczne widełki płacowe',
      'Brak "fluff" w ofertach',
      'Focus na technologie',
      'Polski rynek IT'
    ],
    cons: [
      'Głównie Polska i CEE',
      'Mniej ofert senior+',
      'Czasem powtarzające się firmy'
    ],
    url: 'https://nofluffjobs.com'
  },
  {
    rank: 3,
    name: 'Stack Overflow Jobs',
    description: 'Platforma dla programistów od twórców Stack Overflow. Wysokiej jakości oferty, możliwość prezentacji swojego kodu i CV dostosowane do developerów.',
    rating: 4.4,
    userCount: '50M+',
    verified: true,
    pros: [
      'Społeczność developerów',
      'Wysokiej jakości oferty',
      'Techniczne podejście',
      'Globalny zasięg'
    ],
    cons: [
      'Mniej lokalnych ofert',
      'Konkurencja z całego świata',
      'Wymaga aktywności na SO'
    ],
    url: 'https://stackoverflow.com/jobs'
  },
  {
    rank: 4,
    name: 'Indeed',
    description: 'Jeden z największych agregatorów ofert pracy na świecie. Szeroki wybór pozycji Java, od junior po architect. Prosty interfejs i skuteczne filtry wyszukiwania.',
    rating: 4.2,
    userCount: '250M+',
    verified: true,
    pros: [
      'Ogromna baza ofert',
      'Globalne pokrycie',
      'Prostota użytkowania',
      'Regularne aktualizacje'
    ],
    cons: [
      'Różna jakość ofert',
      'Duplikaty ogłoszeń',
      'Czasem nieaktualne informacje'
    ],
    url: 'https://indeed.com'
  },
  {
    rank: 5,
    name: 'JustJoin.it',
    description: 'Popularna polska platforma IT. Nowoczesny design, szczegółowe filtry technologiczne i focus na start-upy oraz scale-upy. Dobre miejsce dla Java developerów szukających dynamicznych firm.',
    rating: 4.3,
    userCount: '300K+',
    verified: true,
    pros: [
      'Nowoczesny interfejs',
      'Focus na start-upy',
      'Dobre filtry technologiczne',
      'Aktywna społeczność'
    ],
    cons: [
      'Głównie młode firmy',
      'Mniej ofert enterprise',
      'Czasem nierealistyczne wymagania'
    ],
    url: 'https://justjoin.it'
  },
  {
    rank: 6,
    name: 'Glassdoor',
    description: 'Platforma łącząca oferty pracy z recenzjami firm od pracowników. Świetne insights o kulturze organizacyjnej, wynagrodzeniach i procesach rekrutacyjnych w firmach.',
    rating: 4.0,
    userCount: '67M+',
    verified: true,
    pros: [
      'Recenzje od pracowników',
      'Informacje o wynagrodzeniach',
      'Insights o kulturze firmy',
      'Przygotowanie do rozmów'
    ],
    cons: [
      'Czasem stronnicze opinie',
      'Mniej ofert IT',
      'US-centryczny'
    ],
    url: 'https://glassdoor.com'
  }
]

export const JobBoardsRanking = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  return (
    <div className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-java-orange mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ranking Job Boardów
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-java-blue mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className="text-xl text-java-blue max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Sprawdź najlepsze platformy do poszukiwania pracy w Java. 
            Ranking oparty na doświadczeniach społeczności programistów, 
            jakości ofert i funkcjonalnościach dla developerów.
          </motion.p>
        </motion.div>

        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {jobBoardsData.map((jobBoard) => (
            <JobCard key={jobBoard.rank} jobBoard={jobBoard} />
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center bg-java-orange/5 dark:bg-java-orange/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-java-orange mb-4"
            whileHover={{ scale: 1.02 }}
          >
            💡 Pro Tip
          </motion.h3>
          <motion.p 
            className="text-java-blue leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Najlepsza strategia to korzystanie z kilku platform jednocześnie. 
            Ustaw alerty na LinkedIn i NoFluffJobs, regularnie sprawdzaj Stack Overflow Jobs, 
            a przed rozmowami poczytaj o firmie na Glassdoor.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
})

JobBoardsRanking.displayName = 'JobBoardsRanking' 