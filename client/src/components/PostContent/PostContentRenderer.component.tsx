import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface PostContentRendererProps {
  content: string
  className?: string
}

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

export const PostContentRenderer = ({ content, className = '' }: PostContentRendererProps) => {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 