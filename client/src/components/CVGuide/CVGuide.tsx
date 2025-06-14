import { memo } from 'react'
import { CVHeroSection } from './components/CVHeroSection.component'
import { CVContent } from './components/CVContent.component'
import { Tooltip } from './components/Tooltip.component'
import { useTooltip } from './hooks/useTooltip.hook'
import { tooltipData } from './types/tooltipData'

export const CVGuide = memo(() => {
  const { activeTooltip, openTooltip, closeTooltip } = useTooltip()

  return (
    <div className="min-h-screen bg-gradient-to-br from-java-orange/5 via-white to-java-orange/10">
      <CVHeroSection />
      <CVContent 
        activeTooltip={activeTooltip}
        onSectionClick={openTooltip}
      />
      {activeTooltip && (
        <Tooltip 
          data={tooltipData[activeTooltip]} 
          onClose={closeTooltip} 
        />
      )}
    </div>
  )
})

CVGuide.displayName = 'CVGuide' 