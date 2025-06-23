import { memo } from 'react';
import { CVSection } from './CVSection.component';
import type { CVSectionContentProps } from '../types';

export const CVProjectsSection = memo<CVSectionContentProps>(
  ({ activeTooltip, onSectionClick }) => (
    <CVSection
      id="projects"
      title="Projekty"
      onClick={() => onSectionClick('projects')}
      isActive={activeTooltip === 'projects'}
    >
      <div className="py-6 border-b border-java-orange/20 space-y-4">
        <div>
          <h4 className="font-semibold text-java-blue/80 mb-2">
            TaskManager Pro
          </h4>
          <p className="text-java-blue/80 text-sm mb-2">
            Aplikacja do zarządzania projektami z real-time collaboration.
            Technologie: Spring Boot, WebSocket, React, PostgreSQL
          </p>
          <div className="flex gap-4 text-xs">
            <span className="text-java-orange">
              🔗 github.com/jan/taskmanager
            </span>
            <span className="text-java-orange">🌐 taskmanager-demo.com</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-java-blue/80 mb-2">
            CryptoTracker API
          </h4>
          <p className="text-java-blue/80 text-sm mb-2">
            REST API do śledzenia kursów kryptowalut z cache'owaniem Redis.
            Technologie: Spring Boot, Redis, Docker, Swagger
          </p>
          <div className="flex gap-4 text-xs">
            <span className="text-java-orange">
              🔗 github.com/jan/cryptotracker
            </span>
          </div>
        </div>
        <p className="text-sm text-java-blue/80 mt-4 italic">
          Kliknij aby dowiedzieć się jak prezentować projekty
        </p>
      </div>
    </CVSection>
  )
);

CVProjectsSection.displayName = 'CVProjectsSection';
