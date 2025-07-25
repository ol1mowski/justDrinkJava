import { memo, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeSwitcher } from './ThemeSwitcher.components';
import { LanguageSwitcher } from './LanguageSwitcher.components';

interface MobileControlsProps {
  onMenuOpen: () => void;
}

export const MobileControls = memo<MobileControlsProps>(({ onMenuOpen }) => {
  return (
    <div className="lg:hidden flex items-center space-x-2">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <button
        onClick={onMenuOpen}
        className="relative p-3 rounded-xl
                 
           transition-all duration-300 
                transform hover:scale-105 border border-java-gray/10 
                dark:border-java-dark-text/10 hover:border-java-orange/20
                cursor-pointer focus:outline-none"
      >
        <Bars3Icon className="w-6 h-6 text-java-gray dark:text-java-dark-text" />
      </button>
    </div>
  );
});

MobileControls.displayName = 'MobileControls';
