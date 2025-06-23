import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PostDetailHeaderProps {
  onBack: () => void;
}

export const PostDetailHeader = ({ onBack }: PostDetailHeaderProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onBack}
      className="mb-8 flex items-center gap-2 text-java-gray hover:text-java-orange transition-colors duration-200 group"
    >
      <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
      <span className="font-medium">Powrót do postów</span>
    </motion.button>
  );
};
