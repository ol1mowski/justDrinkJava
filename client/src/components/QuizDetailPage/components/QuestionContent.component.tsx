import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface QuestionContentProps {
  question: string;
  questionType: 'single' | 'multiple';
}

const questionMarkdownComponents: Components = {
  p: ({ children }) => (
    <span className="text-xl font-semibold text-java-gray dark:text-java-dark-text leading-relaxed">
      {children}
    </span>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-java-orange">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-java-gray dark:text-java-dark-text">
      {children}
    </em>
  ),
  code: ({ children }) => (
    <code className="bg-java-orange/10 text-java-orange px-2 py-1 rounded text-lg font-mono">
      {children}
    </code>
  ),
  h1: ({ children }) => (
    <span className="text-2xl font-bold text-java-gray dark:text-java-dark-text">
      {children}
    </span>
  ),
  h2: ({ children }) => (
    <span className="text-xl font-bold text-java-gray dark:text-java-dark-text">
      {children}
    </span>
  ),
  h3: ({ children }) => (
    <span className="text-lg font-semibold text-java-gray dark:text-java-dark-text">
      {children}
    </span>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-java-gray dark:text-java-dark-text space-y-1 my-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-java-gray dark:text-java-dark-text space-y-1 my-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-lg text-java-gray dark:text-java-dark-text">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-java-orange bg-java-orange/5 px-3 py-2 rounded-r-lg my-2">
      <div className="text-lg text-java-gray dark:text-java-dark-text italic">
        {children}
      </div>
    </blockquote>
  ),
};

export const QuestionContent = memo<QuestionContentProps>(
  ({ question, questionType }) => {
    return (
      <div>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={questionMarkdownComponents}
          >
            {question}
          </ReactMarkdown>
        </div>

        {questionType === 'multiple' && (
          <p className="text-sm text-gray-500 dark:text-java-dark-text-secondary mt-2">
            Zaznacz wszystkie poprawne odpowiedzi
          </p>
        )}
      </div>
    );
  }
);

QuestionContent.displayName = 'QuestionContent';
