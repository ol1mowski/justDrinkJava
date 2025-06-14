import { memo } from 'react'
import { CVHeaderSection } from './CVHeaderSection.component'
import { CVSummarySection } from './CVSummarySection.component'
import { CVExperienceSection } from './CVExperienceSection.component'
import { CVSkillsSection } from './CVSkillsSection.component'
import { CVProjectsSection } from './CVProjectsSection.component'
import { CVEducationSection } from './CVEducationSection.component'
import type { CVContentProps } from '../types'

export const CVContent = memo<CVContentProps>(({ activeTooltip, onSectionClick }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="bg-white rounded-xl shadow-2xl border border-java-orange/20 overflow-hidden">
      <div className="p-8 space-y-8">
        <CVHeaderSection 
          activeTooltip={activeTooltip} 
          onSectionClick={onSectionClick} 
        />
        <CVSummarySection 
          activeTooltip={activeTooltip} 
          onSectionClick={onSectionClick} 
        />
        <CVExperienceSection 
          activeTooltip={activeTooltip} 
          onSectionClick={onSectionClick} 
        />
        <CVSkillsSection 
          activeTooltip={activeTooltip} 
          onSectionClick={onSectionClick} 
        />
        <CVProjectsSection 
          activeTooltip={activeTooltip} 
          onSectionClick={onSectionClick} 
        />
        <CVEducationSection 
          activeTooltip={activeTooltip} 
          onSectionClick={onSectionClick} 
        />
        
        {/* Sekcja z blur i komunikatem o logowaniu */}
        <div className="relative">
          <div className="blur-sm pointer-events-none">
            <div className="p-6 rounded-lg border-2 border-java-orange/30 bg-java-orange/5">
              <h3 className="text-lg font-semibold text-java-blue/80 mb-3">
                Dodatkowe sekcje CV
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-java-blue/80 mb-2">Języki obce</h4>
                  <p className="text-gray-700 text-sm">
                    Angielski - C1 (Advanced), Niemiecki - B2 (Upper-Intermediate)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-java-blue/80 mb-2">Zainteresowania</h4>
                  <p className="text-gray-700 text-sm">
                    Programowanie open-source, szachy, fotografia, podróże
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-java-blue/80 mb-2">Osiągnięcia</h4>
                  <p className="text-gray-700 text-sm">
                    Zwycięzca hackathonu TechChallenge 2023, Prelegent na konferencji JavaDev
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overlay z komunikatem */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <div className="text-center p-6">
              <div className="mb-4">
                <svg className="w-16 h-16 text-java-orange mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Więcej porad czeka na Ciebie!
              </h3>
              <p className="text-gray-600 mb-4">
                Aby zobaczyć więcej porad musisz się zalogować
              </p>
              <button className="bg-java-orange hover:bg-java-orange/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Zaloguj się
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
))

CVContent.displayName = 'CVContent' 