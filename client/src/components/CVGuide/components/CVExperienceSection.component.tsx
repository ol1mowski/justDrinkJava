import { memo } from 'react'
import { CVSection } from './CVSection.component'
import type { CVSectionContentProps } from '../types'

export const CVExperienceSection = memo<CVSectionContentProps>(({ activeTooltip, onSectionClick }) => (
  <CVSection
    id="experience"
    title="Doświadczenie zawodowe"
    onClick={() => onSectionClick('experience')}
    isActive={activeTooltip === 'experience'}
  >
    <div className="py-6 border-b border-java-orange/20 space-y-6">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-java-blue/80">
            Senior Java Developer
          </h3>
          <span className="text-sm text-java-blue/80">03/2021 - obecnie</span>
        </div>
        <p className="text-java-orange font-medium mb-2">TechCorp Sp. z o.o.</p>
        <ul className="text-java-blue/80 space-y-1 text-sm">
          <li>• Zbudowałem system płatności obsługujący 50k transakcji dziennie używając Spring Boot i PostgreSQL</li>
          <li>• Zoptymalizowałem zapytania bazodanowe, redukując czas odpowiedzi o 60%</li>
          <li>• Wdrożyłem CI/CD pipeline z Jenkins, skracając czas deploymentu z 2h do 15min</li>
        </ul>
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-java-blue/80">
            Java Developer
          </h3>
          <span className="text-sm text-java-blue/80">06/2019 - 02/2021</span>
        </div>
        <p className="text-java-orange font-medium mb-2">StartupXYZ</p>
        <ul className="text-java-blue/80 space-y-1 text-sm">
          <li>• Rozwijałem aplikację e-commerce w Spring MVC obsługującą 10k użytkowników</li>
          <li>• Implementowałem REST API z dokumentacją Swagger</li>
          <li>• Współpracowałem z zespołem frontend w metodologii Scrum</li>
        </ul>
      </div>
      <p className="text-sm text-java-blue/80 mt-4 italic">
        Kliknij aby dowiedzieć się jak opisywać doświadczenie zawodowe
      </p>
    </div>
  </CVSection>
))

CVExperienceSection.displayName = 'CVExperienceSection' 