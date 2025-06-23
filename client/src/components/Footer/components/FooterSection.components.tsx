import { memo } from 'react';
import type { FooterSectionProps } from '../types';

export const FooterSection = memo<FooterSectionProps>(({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
));

FooterSection.displayName = 'FooterSection';
