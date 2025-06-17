import { memo } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'

export const HeroSection = memo(() => {
  return (
    <div className="relative bg-gradient-to-br from-java-orange/20 via-java-orange/10 to-java-orange/5 dark:from-java-orange/30 dark:via-java-orange/20 dark:to-java-orange/10 py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-java-orange/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-java-orange/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
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
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <HeartIcon className="w-10 h-10 text-java-orange" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-java-gray dark:text-java-dark-text mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            O{" "}
            <motion.span 
              className="text-java-orange"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Just
            </motion.span>
            <motion.span 
              className="text-java-blue"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Drink
            </motion.span>
            <motion.span 
              className="text-java-orange"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Java
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-java-blue leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Miejsce, gdzie kod spotyka się z kawą, a wiedza płynie jak doskonale zaparzone espresso
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
})

HeroSection.displayName = 'HeroSection' 