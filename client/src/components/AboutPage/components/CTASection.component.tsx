import { memo } from 'react';
import { motion } from 'framer-motion';

export const CTASection = memo(() => {
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-java-orange mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
        >
          Dołącz do Podróży
        </motion.h2>

        <motion.p
          className="text-xl text-java-blue mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Zacznij swoją przygodę z programowaniem Java już dziś. Odkrywaj nowe
          możliwości, rozwijaj umiejętności i buduj przyszłość z kodem.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
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
              boxShadow:
                '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Czytaj Posty
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
              boxShadow:
                '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Rozwiązuj Quizy
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
});

CTASection.displayName = 'CTASection';
