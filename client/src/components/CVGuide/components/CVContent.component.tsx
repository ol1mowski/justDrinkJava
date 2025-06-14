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
      </div>
    </div>
  </div>
))

CVContent.displayName = 'CVContent' 