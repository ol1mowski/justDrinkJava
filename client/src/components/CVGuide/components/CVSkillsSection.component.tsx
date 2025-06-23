import { memo } from 'react';
import { CVSection } from './CVSection.component';
import type { CVSectionContentProps } from '../types';

export const CVSkillsSection = memo<CVSectionContentProps>(
  ({ activeTooltip, onSectionClick }) => (
    <CVSection
      id="skills"
      title="Umiejętności techniczne"
      onClick={() => onSectionClick('skills')}
      isActive={activeTooltip === 'skills'}
    >
      <div className="py-6 border-b border-java-orange/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-java-blue/80 mb-3">Backend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-java-blue/80">Java</span>
                <span className="text-java-orange">Zaawansowany (5 lat)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-java-blue/80">Spring Boot</span>
                <span className="text-java-orange">Zaawansowany (4 lata)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-java-blue/80">PostgreSQL</span>
                <span className="text-java-orange">
                  Średniozaawansowany (3 lata)
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-java-blue/80 mb-3">
              DevOps & Narzędzia
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-java-blue/80">Docker</span>
                <span className="text-java-orange">
                  Średniozaawansowany (2 lata)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-java-blue/80">AWS</span>
                <span className="text-java-orange">Podstawowy (1 rok)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-java-blue/80">Git</span>
                <span className="text-java-orange">Zaawansowany (5 lat)</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-java-blue/80 mt-4 italic">
          Kliknij aby dowiedzieć się jak prezentować umiejętności techniczne
        </p>
      </div>
    </CVSection>
  )
);

CVSkillsSection.displayName = 'CVSkillsSection';
