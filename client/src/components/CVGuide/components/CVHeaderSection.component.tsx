import { memo } from 'react'
import { CVSection } from './CVSection.component'
import type { CVSectionContentProps } from '../types'

export const CVHeaderSection = memo<CVSectionContentProps>(({ activeTooltip, onSectionClick }) => (
  <CVSection
    id="header"
    title="Dane kontaktowe"
    onClick={() => onSectionClick('header')}
    isActive={activeTooltip === 'header'}
  >
    <div className="text-center border-b border-java-orange/20 pb-6">
      <div className="flex flex-col items-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-java-orange to-java-blue mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          JK
        </div>
        <h1 className="text-3xl font-bold text-java-blue/80 mb-2">
          Jan Kowalski
        </h1>
        <p className="text-xl text-java-orange mb-4">Senior Java Developer</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-java-blue/80">
        <span>📧 jan.kowalski@email.com</span>
        <span>📱 +48 123 456 789</span>
        <span>💼 linkedin.com/in/jankowalski</span>
        <span>🔗 github.com/jankowalski</span>
      </div>
      <p className="text-sm text-java-blue/80 mt-3 italic">
        Kliknij aby dowiedzieć się jak poprawnie uzupełnić dane kontaktowe
      </p>
    </div>
  </CVSection>
))

CVHeaderSection.displayName = 'CVHeaderSection' 