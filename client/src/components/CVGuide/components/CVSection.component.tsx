import { memo } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { CVSectionProps } from '../types';

export const CVSection = memo<CVSectionProps>(
  ({ title, children, onClick, isActive }) => (
    <div
      className={`relative p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer
      ${
        isActive
          ? 'border-java-orange bg-java-orange/10 shadow-lg'
          : 'border-java-orange/30 hover:border-java-orange/60 hover:bg-java-orange/5 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2">
        <InformationCircleIcon className="w-5 h-5 text-java-orange" />
      </div>
      <h3 className="text-lg font-semibold text-java-blue/80 mb-3">{title}</h3>
      {children}
    </div>
  )
);

CVSection.displayName = 'CVSection';
