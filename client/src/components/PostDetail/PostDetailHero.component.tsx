import { motion } from 'framer-motion'

interface PostDetailHeroProps {
  imageUrl?: string
  title: string
  categoryName?: string
}

export const PostDetailHero = ({ imageUrl, title, categoryName }: PostDetailHeroProps) => {
  const defaultImage = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl"
    >
      <img
        src={imageUrl || defaultImage}
        alt={title}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-java-orange text-white shadow-lg">
          {categoryName || 'Artykuł'}
        </span>
      </div>
    </motion.div>
  )
} 