import { motion } from 'framer-motion'
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon, BookmarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostContentContainer } from '../../components/PostContent'
import { usePost } from '../../hooks/usePost.hook'

export const PostDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const postId = parseInt(id || '1', 10)
  const { post, isLoading: isPostLoading, isError: isPostError, error: postError } = usePost(postId)

  const handleBack = () => {
    navigate(-1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isPostLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-java-gray hover:text-java-orange transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Powrót do postów</span>
          </motion.button>

          <div className="animate-pulse">
            <div className="h-64 md:h-80 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (isPostError || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-java-gray hover:text-java-orange transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Powrót do postów</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full mx-auto">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Nie można załadować posta
            </h1>
            
            <p className="text-gray-600 mb-6">
              {postError?.message || 'Post o podanym ID nie istnieje lub wystąpił błąd podczas ładowania.'}
            </p>
            
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-java-orange hover:bg-java-orange/90 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-java-orange transition-colors duration-200"
            >
              Powrót do postów
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-java-gray hover:text-java-orange transition-colors duration-200 group"
        >
          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Powrót do postów</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={post.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80'}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-java-orange text-white shadow-lg">
              {post.category?.name || 'Artykuł'}
            </span>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-java-dark mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-java-gray">
            <div className="flex items-center gap-2">
              <img
                src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'}
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-java-dark">
                {post.user.username}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="w-4 h-4" />
              <span className="text-sm">{formatDate(post.createdAt)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">{post.readTime} min czytania</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-java-light-gray/20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-50 text-red-600' 
                  : 'bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange'
              }`}
            >
              {isLiked ? (
                <HeartSolidIcon className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="font-medium">{(isLiked ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange transition-all duration-200"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span className="font-medium">0</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isBookmarked 
                  ? 'bg-java-orange/10 text-java-orange' 
                  : 'bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange'
              }`}
            >
              {isBookmarked ? (
                <BookmarkSolidIcon className="w-5 h-5" />
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
              <span className="font-medium">{(isBookmarked ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange transition-all duration-200"
            >
              <ShareIcon className="w-5 h-5" />
              <span className="font-medium">Udostępnij</span>
            </motion.button>
          </div>

          <div className="markdown-content">
            <PostContentContainer 
              postId={postId}
            />
          </div>
        </motion.article>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-java-dark mb-6">Podobne posty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-java-gray text-center py-8">
                Powiązane posty będą tutaj wyświetlane
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-java-gray text-center py-8">
                Powiązane posty będą tutaj wyświetlane
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 