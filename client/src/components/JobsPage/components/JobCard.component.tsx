import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface JobBoardData {
  rank: number;
  name: string;
  description: string;
  rating: number;
  userCount: string;
  verified: boolean;
  pros: string[];
  cons: string[];
  url: string;
  logo?: string;
}

interface JobCardProps {
  jobBoard: JobBoardData;
}

export const JobCard = memo(({ jobBoard }: JobCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="relative">
        {i < Math.floor(rating) ? (
          <StarSolidIcon className="w-5 h-5 text-java-orange" />
        ) : i === Math.floor(rating) && rating % 1 !== 0 ? (
          <div className="relative">
            <StarIcon className="w-5 h-5 text-java-orange/30" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <StarSolidIcon className="w-5 h-5 text-java-orange" />
            </div>
          </div>
        ) : (
          <StarIcon className="w-5 h-5 text-java-orange/30" />
        )}
      </div>
    ));
  };

  return (
    <motion.div
      className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-java-orange/10 relative overflow-hidden group"
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-java-orange/20 to-java-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-java-orange to-java-blue rounded-full flex items-center justify-center text-white font-bold text-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              #{jobBoard.rank}
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-java-gray dark:text-java-dark-text">
                  {jobBoard.name}
                </h3>
                {jobBoard.verified && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <CheckBadgeIcon className="w-6 h-6 text-java-blue" />
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {renderStars(jobBoard.rating)}
                </div>
                <span className="text-java-orange font-semibold">
                  {jobBoard.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.a
            href={jobBoard.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-java-orange/10 rounded-full hover:bg-java-orange hover:text-white transition-all duration-200 group/link"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowTopRightOnSquareIcon className="w-6 h-6 text-java-orange group-hover/link:text-white" />
          </motion.a>
        </div>

        <motion.p
          className="text-java-blue mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {jobBoard.description}
        </motion.p>

        <motion.div
          className="flex items-center gap-4 mb-6 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-java-blue">
            <UserGroupIcon className="w-4 h-4" />
            <span>{jobBoard.userCount} użytkowników</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-semibold text-java-orange mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-java-orange rounded-full" />
              Zalety
            </h4>
            <ul className="space-y-2">
              {jobBoard.pros.map((pro, index) => (
                <motion.li
                  key={index}
                  className="text-java-blue text-sm flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <CheckBadgeIcon className="w-4 h-4 text-java-orange mt-0.5 flex-shrink-0" />
                  {pro}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-semibold text-java-blue mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-java-blue rounded-full" />
              Wady
            </h4>
            <ul className="space-y-2">
              {jobBoard.cons.map((con, index) => (
                <motion.li
                  key={index}
                  className="text-java-blue text-sm flex items-start gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                    <div className="w-1 h-3 bg-java-orange/50 rounded-full mx-auto" />
                  </div>
                  {con}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

JobCard.displayName = 'JobCard';
