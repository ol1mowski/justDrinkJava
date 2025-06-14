import { memo } from 'react'
import { CVSection } from './CVSection.component'
import type { CVSectionContentProps } from '../types'

export const CVEducationSection = memo<CVSectionContentProps>(({ activeTooltip, onSectionClick }) => (
  <CVSection
    id="education"
    title="Wykształcenie"
    onClick={() => onSectionClick('education')}
    isActive={activeTooltip === 'education'}
  >
    <div className="py-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-java-blue/80">
              Informatyka, Inżynier
            </h4>
            <span className="text-sm text-java-blue/80">2015 - 2019</span>
          </div>
          <p className="text-java-orange font-medium text-sm">Politechnika Warszawska</p>
        </div>
        <div>
          <h4 className="font-semibold text-java-blue/80 mb-2">
            Certyfikaty
          </h4>
          <ul className="text-java-blue/80 text-sm space-y-1">
            <li>• Oracle Certified Professional: Java SE 11 Developer (2022)</li>
            <li>• AWS Certified Developer Associate (2023)</li>
            <li>• Spring Professional Certification (2021)</li>
          </ul>
        </div>
      </div>
      <p className="text-sm text-java-blue/80 mt-4 italic">
        Kliknij aby dowiedzieć się jak prezentować wykształcenie
      </p>
    </div>
  </CVSection>
))

CVEducationSection.displayName = 'CVEducationSection' 