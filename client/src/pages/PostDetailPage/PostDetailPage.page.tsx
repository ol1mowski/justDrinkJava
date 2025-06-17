import { motion } from 'framer-motion'
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

// Dummy data - teraz w formacie Markdown
const dummyPost = {
  id: 1,
  title: "Spring Boot vs Node.js: Kompleksowe porównanie dla Java developerów",
  content: `
W dzisiejszych czasach wybór odpowiedniej technologii backendowej może zadecydować o sukcesie całego projektu. Jako Java developer, prawdopodobnie zastanawiasz się, czy warto poznać Node.js, czy może skupić się na rozwijaniu umiejętności w Spring Boot.

## Wprowadzenie do Spring Boot

Spring Boot to framework, który rewolucjonizuje sposób tworzenia aplikacji Java. Dzięki konwencji "convention over configuration" możemy szybko tworzyć gotowe do produkcji aplikacje bez konieczności konfigurowania wszystkiego od zera.

### Kluczowe zalety Spring Boot:

- Automatyczna konfiguracja
- Wbudowany serwer aplikacji  
- Świetna integracja z ekosystemem Spring
- Doskonała obsługa testów

## Node.js - JavaScript po stronie serwera

Node.js pozwala używać JavaScript również po stronie serwera, co oznacza, że frontend i backend mogą dzielić ten sam język programowania. To ogromna zaleta, szczególnie dla małych zespołów.

### Zalety Node.js:

- Szybkość rozwoju dzięki JavaScript
- Ogromny ekosystem npm
- Świetna wydajność dla I/O intensive aplikacji
- Aktywna społeczność

## Porównanie wydajności

W przypadku aplikacji **CPU-intensive**, Java z Spring Boot ma przewagę dzięki kompilacji do bytecode i optymalizacjom JVM. Jednak dla aplikacji opartych na I/O, Node.js może być szybszy dzięki *event loop*.

### Przykład kodu Spring Boot:

\`\`\`java
@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}
\`\`\`

### Przykład kodu Node.js:

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(3000);
\`\`\`

## Podsumowanie

Wybór między Spring Boot a Node.js zależy od wielu czynników: doświadczenia zespołu, wymagań projektu, czy planowanej skali aplikacji. Oba rozwiązania mają swoje miejsce w nowoczesnym stacku technologicznym.

> "Najlepszy framework to ten, który najlepiej pasuje do Twojego zespołu i projektu."

Pamiętaj, że to nie jest wybór na całe życie - możesz nauczyć się obu technologii i używać tej, która najlepiej pasuje do konkretnego projektu!
  `,
  imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
  category: {
    id: 1,
    name: "Backend Development"
  },
  user: {
    id: 1,
    username: "jakub_java_dev",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  createdAt: "2024-01-15T10:30:00Z",
  readTime: 8,
  hashtags: [
    { id: 1, name: "springboot", postCount: 145 },
    { id: 2, name: "nodejs", postCount: 89 },
    { id: 3, name: "backend", postCount: 234 },
    { id: 4, name: "java", postCount: 567 }
  ],
  stats: {
    likes: 142,
    comments: 28,
    bookmarks: 67
  }
}

// Komponenty do stylowania Markdown
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-java-dark mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-java-dark mb-4 mt-8 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-java-dark mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-java-gray leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-java-gray space-y-2 mb-4 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-java-gray space-y-2 mb-4 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-java-gray leading-relaxed">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-java-dark">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-java-gray">
      {children}
    </em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-java-orange bg-java-light-gray/10 px-4 py-3 rounded-r-lg mb-4 italic">
      <div className="text-java-gray">
        {children}
      </div>
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isCodeBlock = className?.includes('language-')
    
    if (isCodeBlock) {
      return (
        <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {children}
          </code>
        </div>
      )
    }
    
    return (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <div className="mb-4">
      {children}
    </div>
  ),
  a: ({ children, href }) => (
    <a 
      href={href} 
      className="text-java-orange hover:text-java-orange/80 underline transition-colors duration-200"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export const PostDetailPage = () => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
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

        {/* Header Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={dummyPost.imageUrl}
            alt={dummyPost.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-java-orange text-white shadow-lg">
              {dummyPost.category.name}
            </span>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-java-dark mb-6 leading-tight">
            {dummyPost.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-java-gray">
            <div className="flex items-center gap-2">
              <img
                src={dummyPost.user.avatarUrl}
                alt={dummyPost.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-java-dark">
                {dummyPost.user.username}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="w-4 h-4" />
              <span className="text-sm">{formatDate(dummyPost.createdAt)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">{dummyPost.readTime} min czytania</span>
            </div>
          </div>

          {/* Action Buttons */}
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
              <span className="font-medium">{dummyPost.stats.likes + (isLiked ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange transition-all duration-200"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span className="font-medium">{dummyPost.stats.comments}</span>
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
              <span className="font-medium">{dummyPost.stats.bookmarks + (isBookmarked ? 1 : 0)}</span>
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

          {/* Content - React Markdown z własnymi komponentami */}
          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {dummyPost.content}
            </ReactMarkdown>
          </div>

          {/* Hashtags */}
          <div className="mt-12 pt-8 border-t border-java-light-gray/20">
            <h3 className="text-lg font-semibold text-java-dark mb-4">Tagi</h3>
            <div className="flex flex-wrap gap-2">
              {dummyPost.hashtags.map((hashtag) => (
                <motion.span
                  key={hashtag.id}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-java-light-blue/20 text-java-orange hover:bg-java-orange hover:text-white transition-all duration-200 cursor-pointer"
                >
                  #{hashtag.name}
                  <span className="ml-1 text-xs opacity-75">({hashtag.postCount})</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Related Posts Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-java-dark mb-6">Podobne posty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related posts */}
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