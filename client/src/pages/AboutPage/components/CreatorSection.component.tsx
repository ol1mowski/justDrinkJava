import { memo } from 'react'
import { motion } from 'framer-motion'
import { UserIcon } from '@heroicons/react/24/outline'

const skills = ['Java', 'Spring Boot', 'Microservices', 'Docker', 'AWS', 'Coffee Expert']

export const CreatorSection = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <div className="py-20 lg:py-28 bg-gradient-to-br from-java-orange/15 to-java-orange/5 dark:from-java-orange/25 dark:to-java-orange/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-java-blue mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Twórca
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-java-orange mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div 
          className="bg-java-white dark:bg-java-dark-surface rounded-3xl p-8 lg:p-12 shadow-xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0">
              <motion.div 
                className="w-40 h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-java-orange to-java-blue rounded-full flex items-center justify-center shadow-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20,
                  delay: 0.2 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <UserIcon className="w-20 h-20 lg:w-24 lg:h-24 text-white" />
              </motion.div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <motion.h3 
                className="text-3xl lg:text-4xl font-bold text-java-gray dark:text-java-dark-text mb-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Aleksander Kowalski
              </motion.h3>
              
              <motion.p 
                className="text-xl text-java-orange font-semibold mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Full-Stack Java Developer & Coffee Enthusiast
              </motion.p>
              
              <div className="space-y-4 text-java-blue leading-relaxed">
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Pasjonat programowania z ponad 8-letnim doświadczeniem w ekosystemie Java. 
                  Specjalizuje się w Spring Boot, mikrousługach i architekturze cloud-native.
                </motion.p>
                
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Gdy nie koduje, eksperymentuje z nowymi metodami parzenia kawy i dzieli się 
                  wiedzą z społecznością programistów. Wierzy, że najlepszy kod powstaje przy filiżance 
                  doskonale zaparzonej kawy.
                </motion.p>
                
                <motion.p 
                  className="text-lg font-medium text-java-orange"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  "Code, Coffee, Repeat – to moja dewiza w życiu i pracy."
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.map((skill) => (
                  <motion.span 
                    key={skill} 
                    className="px-4 py-2 bg-java-blue/10 text-java-blue rounded-full text-sm font-medium border border-java-blue/20"
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(83, 130, 161, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
})

CreatorSection.displayName = 'CreatorSection' 