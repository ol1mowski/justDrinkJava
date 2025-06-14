import { memo } from 'react'
import { CVSection } from './CVSection.component'
import type { CVSectionContentProps } from '../types'

export const CVSummarySection = memo<CVSectionContentProps>(({ activeTooltip, onSectionClick }) => (
  <CVSection
    id="summary"
    title="Podsumowanie zawodowe"
    onClick={() => onSectionClick('summary')}
    isActive={activeTooltip === 'summary'}
  >
    <div className="py-6 border-b border-java-orange/20">
      <p className="text-java-blue/80 leading-relaxed">
        Doświadczony Java Developer z 5-letnim stażem w tworzeniu aplikacji enterprise. 
        Specjalizuję się w Spring Boot, mikrousługach i architekturze chmurowej. 
        Szukam możliwości rozwoju w zespole pracującym nad innowacyjnymi rozwiązaniami fintech.
      </p>
      <p className="text-sm text-java-blue/80 mt-3 italic">
        Kliknij aby dowiedzieć się jak napisać skuteczne podsumowanie
      </p>
    </div>
  </CVSection>
))

CVSummarySection.displayName = 'CVSummarySection' 