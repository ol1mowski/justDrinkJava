import { memo } from 'react'
import { motion } from 'framer-motion'
import { CodeBracketIcon, AcademicCapIcon, HeartIcon } from '@heroicons/react/24/outline'

const missionCards = [
  {
    icon: CodeBracketIcon,
    title: 'Kod z Pasją',
    description: 'Dzielimy się wiedzą o programowaniu w Java w sposób przystępny i inspirujący. Każdy artykuł to dawka motywacji do kodowania.',
    borderColor: 'border-java-orange/10',
    iconBg: 'bg-java-orange/10',
    iconColor: 'text-java-orange'
  },
  {
    icon: AcademicCapIcon,
    title: 'Nauka przez Praktykę',
    description: 'Oferujemy praktyczne tutoriale, przykłady kodu i real-world projekty, które pomogą Ci rozwijać umiejętności programistyczne.',
    borderColor: 'border-java-blue/10',
    iconBg: 'bg-java-blue/10',
    iconColor: 'text-java-blue'
  },
  {
    icon: HeartIcon,
    title: 'Społeczność',
    description: 'Budujemy społeczność programistów Java, gdzie każdy może się uczyć, dzielić wiedzą i rozwijać razem z innymi.',
    borderColor: 'border-java-orange/10',
    iconBg: 'bg-java-orange/10',
    iconColor: 'text-java-orange'
  }
]

export const MissionSection = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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
            Nasza Misja
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-java-blue mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {missionCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`group bg-java-white dark:bg-java-dark-surface rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ${card.borderColor}`}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className={`w-16 h-16 ${card.iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <card.icon className={`w-8 h-8 ${card.iconColor}`} />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-java-gray dark:text-java-dark-text mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {card.title}
              </motion.h3>
              <motion.p 
                className="text-java-blue leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                {card.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.blockquote 
            className="text-2xl sm:text-3xl font-medium text-java-gray dark:text-java-dark-text leading-relaxed italic mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            "Wierzymy, że programowanie to nie tylko pisanie kodu, ale tworzenie rozwiązań, 
            które zmieniają świat. Każda linia kodu ma swoją historię."
          </motion.blockquote>
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div 
              className="w-3 h-3 bg-java-orange rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-3 h-3 bg-java-blue rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-3 h-3 bg-java-orange rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
})

MissionSection.displayName = 'MissionSection' 