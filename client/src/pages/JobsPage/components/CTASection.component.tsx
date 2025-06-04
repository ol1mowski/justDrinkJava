import { memo } from 'react'
import { motion } from 'framer-motion'

export const CTASection = memo(() => {
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <div className="py-20 lg:py-28 bg-gradient-to-br from-java-orange/10 to-java-orange/5 dark:from-java-orange/20 dark:to-java-orange/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-java-orange mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          Gotowy na Nową Pracę?
        </motion.h2>
        
        <motion.p 
          className="text-xl text-java-blue mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Wykorzystaj nasz ranking, aby znaleźć idealną platformę do poszukiwania pracy. 
          Sprawdź też nasze artykuły o przygotowaniu do rozmów rekrutacyjnych i rozwoju kariery w Java.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button 
            className="px-8 py-4 bg-java-orange text-white font-bold rounded-xl hover:bg-java-orange/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Przygotuj CV
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 bg-java-blue text-white font-bold rounded-xl hover:bg-java-blue/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Czytaj Porady
          </motion.button>
        </motion.div>

        <motion.div 
          className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          whileHover={{ y: -5 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-java-blue mb-4"
            whileHover={{ scale: 1.02 }}
          >
            🚀 Statystyki Sukcesu
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div 
                className="text-3xl font-bold text-java-orange mb-2"
                whileHover={{ scale: 1.1 }}
              >
                85%
              </motion.div>
              <p className="text-java-blue text-sm">
                programistów Java znajduje pracę w ciągu 3 miesięcy
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.div 
                className="text-3xl font-bold text-java-orange mb-2"
                whileHover={{ scale: 1.1 }}
              >
                12k+
              </motion.div>
              <p className="text-java-blue text-sm">
                nowych ofert Java miesięcznie w Polsce
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.div 
                className="text-3xl font-bold text-java-orange mb-2"
                whileHover={{ scale: 1.1 }}
              >
                15k-25k
              </motion.div>
              <p className="text-java-blue text-sm">
                PLN średnie zarobki Java Developer (mid)
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
})

CTASection.displayName = 'CTASection' 