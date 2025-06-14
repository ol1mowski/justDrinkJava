import { memo } from 'react'
import { CVHeroSection } from './components/CVHeroSection.component'
import { CVContent } from './components/CVContent.component'
import { Tooltip } from './components/Tooltip.component'
import { useTooltip } from './hooks/useTooltip.hook'
import { tooltips } from './types/tooltipData'

export const CVGuide = memo(() => {
  const { activeTooltip, handleSectionClick, closeTooltip } = useTooltip()

  return (
    <div className="min-h-screen bg-gradient-to-br from-java-orange/5 via-white to-java-orange/10">
      <CVHeroSection />
      <CVContent 
        activeTooltip={activeTooltip}
        onSectionClick={handleSectionClick}
      />
      {activeTooltip && (
        <Tooltip 
          data={tooltips[activeTooltip]} 
          onClose={closeTooltip} 
        />
      )}
    </div>
  )
})

CVGuide.displayName = 'CVGuide' 